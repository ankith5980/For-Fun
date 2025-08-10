// This file simulates responses from a backend AI.
// In a real application, these would be API calls.

function getAIContentSuggestion(sectionType) {
    console.log(`AI Mock: Generating content for ${sectionType}`);
    // Show a loading state
    $('#ai-suggestions-output').html('<p><i>AI is thinking...</i></p>');

    return new Promise(resolve => {
        setTimeout(() => { // Simulate network delay
            let suggestions = [];
            if (sectionType === 'hero') {
                suggestions = [
                    "Creative Full-Stack Developer with a Passion for UI/UX.",
                    "Building Seamless Digital Experiences, One Line of Code at a Time.",
                    "Problem Solver & Tech Enthusiast | Turning Ideas into Reality."
                ];
            } else if (sectionType === 'about') {
                suggestions = [
                    "With a foundation in both front-end and back-end technologies, I specialize in crafting robust and user-friendly web applications. My journey in tech is driven by a constant curiosity and a desire to build things that make a difference.",
                    "I am a lifelong learner, currently focused on mastering modern JavaScript frameworks like React and Vue. I thrive in collaborative environments where I can both contribute my skills and learn from my peers."
                ];
            }
            resolve(suggestions);
        }, 1500); // 1.5 second delay
    });
}

// We need to use event delegation since the button is added dynamically
$(document).on('click', '#generate-text-btn', async function() {
    const selectedSection = $('#ai-writer-section-select').val();
    const suggestions = await getAIContentSuggestion(selectedSection);
    
    let outputHtml = '<h4>Here are a few ideas:</h4><ul>';
    suggestions.forEach(s => {
        outputHtml += `<li>${s}</li>`;
    });
    outputHtml += '</ul><p><small>Click to copy (feature coming soon!)</small></p>';
    
    $('#ai-suggestions-output').html(outputHtml);
});