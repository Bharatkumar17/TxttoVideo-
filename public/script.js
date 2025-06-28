document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const generateBtn = document.getElementById('generate-btn');
    const outputContent = document.getElementById('output-content');
    const videoPlaceholder = document.getElementById('video-placeholder');
    
    generateBtn.addEventListener('click', async function() {
        const text = textInput.value.trim();
        
        if (!text) {
            alert('Please enter some text');
            return;
        }
        
        // Show loading state
        outputContent.innerHTML = '<div class="loader"></div><p>Generating content...</p>';
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
        
        try {
            const response = await fetch('/api/generate-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate content');
            }
            
            const data = await response.json();
            
            // Display the generated content
            if (data.candidates && data.candidates[0].content.parts[0].text) {
                const generatedText = data.candidates[0].content.parts[0].text;
                outputContent.innerHTML = generatedText.replace(/\n/g, '<br>');
                
                // Simulate video generation
                simulateVideoGeneration(generatedText);
            } else {
                outputContent.innerHTML = 'No content generated. Please try again.';
            }
        } catch (error) {
            console.error('Error:', error);
            outputContent.innerHTML = `Error: ${error.message}`;
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate Video Script';
        }
    });
    
    function simulateVideoGeneration(text) {
        videoPlaceholder.innerHTML = '<div class="loader"></div><p>Generating video simulation...</p>';
        
        setTimeout(() => {
            videoPlaceholder.innerHTML = `
                <div style="text-align: center;">
                    <h3>Simulated Video Output</h3>
                    <p style="margin-bottom: 1rem;">Based on the generated script:</p>
                    <div style="background: #4285f4; height: 200px; display: flex; align-items: center; justify-content: center; color: white; border-radius: 4px; margin: 0 auto; max-width: 400px;">
                        <p>Video would play here</p>
                    </div>
                    <p style="margin-top: 1rem;">(In a production app, this would be an actual video generated from the text)</p>
                </div>
            `;
        }, 3000);
    }
});
