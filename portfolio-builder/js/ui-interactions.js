$(document).ready(function() {
    const aiModal = $('#ai-modal');
    const aiModalTitle = $('#ai-modal-title');
    const aiModalBody = $('#ai-modal-body');

    // Function to open the modal
    function openModal(title, content) {
        aiModalTitle.text(title);
        aiModalBody.html(content);
        aiModal.removeClass('modal-hidden');
    }

    // Function to close the modal
    function closeModal() {
        aiModal.addClass('modal-hidden');
    }

    // Event listeners
    $('#ai-writer-btn').on('click', function() {
        // We'll pass HTML content to the modal body
        const writerContent = `
            <p>What section do you need help writing?</p>
            <select id="ai-writer-section-select" class="modal-input">
                <option value="hero">Hero Section Tagline</option>
                <option value="about">About Me Paragraph</option>
            </select>
            <button id="generate-text-btn" class="modal-btn">Generate Suggestions</button>
            <div id="ai-suggestions-output"></div>
        `;
        openModal('AI Content Writer', writerContent);
    });

    $('.modal-close-btn').on('click', closeModal);

    // Close modal if clicking on the background
    aiModal.on('click', function(e) {
        if ($(e.target).is(aiModal)) {
            closeModal();
        }
    });

});