const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const analyzeBtn = document.getElementById('analyze-btn');
const resetBtn = document.getElementById('reset-btn');
const resultSection = document.getElementById('result-section');
const scanLine = document.getElementById('scan-line');

// Results Data Mock
const DISEASES = [
    {
        name: "Bacterial Blight",
        treatment: "Use copper-based fungicides like Copper Oxychloride. Remove and destroy infected plant debris. Practice crop rotation.",
        color: "#ff4d4d"
    },
    {
        name: "Cotton Leaf Curl Virus",
        treatment: "Manage whitefly populations using Neem oil or systemic insecticides. Use resistant verities if available.",
        color: "#ffcc00"
    },
    {
        name: "Healthy Plant",
        treatment: "No treatment needed. Maintain regular watering and fertilization schedule.",
        color: "#00ffaa"
    },
    {
        name: "Grey Mildew",
        treatment: "Apply wettable sulphur or Carbendazim. Improve air circulation by spacing plants properly.",
        color: "#aaaaff"
    }
];

// Drag & Drop Handlers
uploadZone.addEventListener('click', () => fileInput.click());

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    handleFile(file);
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    handleFile(file);
});

function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            uploadZone.style.display = 'none';
            previewContainer.style.display = 'block';
            resultSection.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

// Reset Handler
resetBtn.addEventListener('click', () => {
    fileInput.value = '';
    previewContainer.style.display = 'none';
    uploadZone.style.display = 'block';
    resultSection.style.display = 'none';
    scanLine.style.display = 'none';
});

// Analyze Logic
analyzeBtn.addEventListener('click', () => {
    // Start Scanning Animation
    scanLine.style.display = 'block';
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analysing...';

    // Simulate Network Request / Processing
    setTimeout(() => {
        scanLine.style.display = 'none';
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = 'Diagnose Disease';

        showResult();
    }, 2500);
});

function showResult() {
    previewContainer.style.display = 'none';
    resultSection.style.display = 'block';

    // Pick Random Disease
    const disease = DISEASES[Math.floor(Math.random() * DISEASES.length)];
    const confidence = (Math.random() * (99 - 85) + 85).toFixed(1);

    document.getElementById('disease-name').textContent = disease.name;
    document.getElementById('disease-name').style.color = disease.color;
    document.getElementById('treatment-info').textContent = disease.treatment;
    document.getElementById('confidence-score').textContent = `${confidence}%`;

    // Animate Bar
    const bar = document.getElementById('confidence-bar');
    bar.style.width = '0%';
    bar.style.backgroundColor = disease.color;
    setTimeout(() => {
        bar.style.width = `${confidence}%`;
    }, 100);
}
