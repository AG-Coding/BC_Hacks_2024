document.querySelector('.cta-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/generate-content');
        const data = await response.json();
        document.getElementById("textbox").innerText = data.content;
        document.getElementById('textbox').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
    }
});
