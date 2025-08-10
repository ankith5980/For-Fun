$(document).ready(function() {
    const canvas = $('#portfolio-canvas');

    // --- 1. ENABLE REARRANGING (SORTABLE) ---
    // Initialize the sortable functionality on the canvas
    canvas.sortable({
        handle: '.drag-handle', // Dragging is restricted to the drag handle
        placeholder: 'sortable-placeholder', // A class for the visual placeholder
        forcePlaceholderSize: true,
        opacity: 0.7,
        cursor: 'move',
        update: function(event, ui) {
            // This function is called when the user finishes dragging
            // In the future, you can save the new order here.
            console.log("New section order saved (simulated).");
        }
    }).disableSelection(); // Prevents text selection while dragging

    // Add some CSS for the placeholder to the head
    $('head').append('<style>.sortable-placeholder { border: 2px dashed #e94560; background: #fff5f7; height: 100px; margin: 20px 0; }</style>');


    // --- 2. DYNAMICALLY ADD CONTROLS AND SECTIONS ---
    // Updated function to add a section AND its controls
    function addSection(templateFile) {
        $('.canvas-placeholder').remove();
        
        // Use $.get to fetch the template HTML
        $.get(`templates/${templateFile}`, function(data) {
            const newSection = $(data); // Create a jQuery object from the HTML

            // Create the controls
            const controls = `
                <div class="section-controls">
                    <i class="fas fa-grip-vertical drag-handle" title="Drag to rearrange"></i>
                    <i class="fas fa-trash-alt delete-btn" title="Delete section"></i>
                </div>
            `;

            // Append controls to the new section, then append the section to the canvas
            newSection.append(controls);
            canvas.append(newSection);

            // Add a small animation on entry
            newSection.hide().fadeIn(600);
        });
    }


    // --- 3. IMPLEMENT DELETE FUNCTIONALITY ---
    // Use event delegation for the delete button since sections are added dynamically
    canvas.on('click', '.delete-btn', function() {
        // Show a confirmation dialog to prevent accidental deletion
        const wantsToDelete = confirm("Are you sure you want to delete this section?");

        if (wantsToDelete) {
            // Find the closest parent .portfolio-section and remove it with an animation
            $(this).closest('.portfolio-section').fadeOut(400, function() {
                $(this).remove();
                
                // If canvas is empty after deletion, show the placeholder again
                if (canvas.children('.portfolio-section').length === 0) {
                     const placeholder = `
                        <div class="canvas-placeholder">
                            <i class="fas fa-plus-circle"></i>
                            <p>Your portfolio is empty. Add a section from the left panel to begin!</p>
                        </div>
                    `;
                    canvas.html(placeholder);
                }
            });
        }
    });

    // --- 4. DYNAMICALLY ADD NEW PROJECT CARDS --- (NEWLY ADDED CODE)
    canvas.on('click', '.add-project-card-btn', function() {
        const projectGrid = $(this).siblings('.project-grid');
        const newProjectCardHTML = `
    <div class="project-card">
        <button class="delete-card-btn" title="Delete Project">&times;</button> <img src="https://placehold.co/600x400/333/fff?text=New+Project" alt="Project Thumbnail">
        <div class="card-content">
            <h3 contenteditable="true">New Project Title</h3>
            <p contenteditable="true">Enter your project description here. Be sure to mention the technologies you used and the problems you solved.</p>
            <div class="project-tags">
                <span contenteditable="true">New Tag</span>
            </div>
            <div class="project-links">
                <a href="#" class="link-btn"><i class="fas fa-globe"></i> Live Demo</a>
                <a href="#" class="link-btn"><i class="fab fa-github"></i> Source Code</a>
            </div>
        </div>
    </div>
`;
        $(projectGrid).append(newProjectCardHTML);
        $(projectGrid).children('.project-card:last').hide().fadeIn(500);
    });

    // --- 5. DELETE INDIVIDUAL PROJECT CARDS ---
    // Use event delegation for the card delete button
    canvas.on('click', '.delete-card-btn', function(event) {
        event.stopPropagation(); // Prevent event from bubbling up to parent elements

        // Find the closest parent .project-card and remove it with a fade-out effect
        $(this).closest('.project-card').fadeOut(400, function() {
            $(this).remove();
        });
    });


    // --- EVENT LISTENERS for adding sections (no changes here) ---
    $('#add-hero-btn').on('click', function() {
        addSection('hero-section.html');
    });

    $('#add-about-btn').on('click', function() {
        addSection('about-section.html');
    });

    $('#add-projects-btn').on('click', function() {
        addSection('projects-section.html'); 
    });

    $('#add-contact-btn').on('click', function() {
        addSection('contact-section.html');
    });
});