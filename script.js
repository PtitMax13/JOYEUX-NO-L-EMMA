document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start');
  const riddleBox = document.getElementById('riddle-box');
  const riddleText = document.getElementById('riddle-text');
  const starContainer = document.getElementById('star-container');
  const answerInput = document.getElementById('answer-input');
  const submitButton = document.getElementById('submit-answer');
  const feedback = document.getElementById('feedback');
  const rewardCollection = document.getElementById('reward-collection');

  const riddles = [
    { question: "Quel est le jeu vidéo préféré de Sheldon, auquel il joue fréquemment en ligne avec ses amis ?", answer: "Halo" },
    { question: "Quel est le nom de l'animal acheté par Ross qui provoque la jalousie de Rachel ?", answer: "Marcel" },
    { question: "Comment s'appelle l'acteur qui joue le rôle du double maléfique de Joey dans une pub ?", answer: "Carl" },
    { question: "Quel est le prénom de l'homme qui hante le passé de Christian Harper dans Twisted Lies ?", answer: "Marcus" }
  ];

  const rewards = [
    "images/image1.jpg",
    "images/image2.jpg",
    "images/image3.jpeg",
    "images/image4.jpg"
  ];

  let currentRiddleIndex = 0;
  const finalCode = "NOEL2024";

  // Fonction pour créer une étoile
  function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';
    const size = Math.random() * 3 + 2;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    starContainer.appendChild(star);
    setTimeout(() => {
      star.remove();
    }, 2000);
  }

  // Afficher des étoiles
  function showStars() {
    for (let i = 0; i < 50; i++) {
      setTimeout(createStar, i * 50);
    }
  }

  // Débuter les énigmes
  startButton.addEventListener('click', () => {
    if (currentRiddleIndex < riddles.length) {
      riddleText.textContent = riddles[currentRiddleIndex].question;
      answerInput.value = ""; // Réinitialiser le champ de saisie
      feedback.textContent = "";
      showStars();
    }
  });

  // Vérifier une réponse
  submitButton.addEventListener('click', () => {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = riddles[currentRiddleIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      feedback.textContent = "Bonne réponse ! 🎉";
      feedback.style.color = "green";

      // Ajouter une récompense
      const img = document.createElement('img');
      img.src = rewards[currentRiddleIndex];
      img.classList.add('reward-image');
      rewardCollection.appendChild(img);

      // Passer à l'énigme suivante
      currentRiddleIndex++;
      if (currentRiddleIndex < riddles.length) {
        riddleText.textContent = riddles[currentRiddleIndex].question;
        answerInput.value = ""; // Réinitialiser le champ de saisie
      } else {
        // Toutes les énigmes sont résolues
        showFinalAnimation();
      }
      showStars();
    } else {
      feedback.textContent = "Mauvaise réponse, essayez encore.";
      feedback.style.color = "red";
    }
  });

  // Animation finale
  function showFinalAnimation() {
    const overlay = document.createElement('div');
    overlay.id = "overlay";
    document.body.appendChild(overlay);

    const congratsMessage = document.createElement('div');
    congratsMessage.id = "congrats-message";
    congratsMessage.innerHTML = `<h1>FÉLICITATIONS ! 🎉</h1><p>Tu as résolu toutes les énigmes !</p><p> TU PEUX OUVRIR LE CADEAU A ! </p>`;
    overlay.appendChild(congratsMessage);

    rewards.forEach((reward, index) => {
      const img = document.createElement('img');
      img.src = reward;
      img.classList.add('animated-reward');
      img.style.animationDelay = `${index * 0.5}s`; // Décaler les animations
      overlay.appendChild(img);
    });
  }
});
