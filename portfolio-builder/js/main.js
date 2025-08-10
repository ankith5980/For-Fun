$(document).ready(function() {
    const canvas = $('#portfolio-canvas');

    // --- 1. ENABLE REARRANGING (SORTABLE) FOR SECTIONS ---
    canvas.sortable({
        handle: '.drag-handle',
        placeholder: 'sortable-placeholder',
        forcePlaceholderSize: true,
        opacity: 0.7,
        cursor: 'move',
        update: function(event, ui) {
            console.log("New section order saved (simulated).");
        }
    }).disableSelection();

    $('head').append('<style>.sortable-placeholder { border: 2px dashed #e94560; background: #fff5f7; height: 100px; margin: 20px 0; }</style>');

    // --- 2. DYNAMICALLY ADD CONTROLS AND SECTIONS ---
    function addSection(templateFile) {
        $('.canvas-placeholder').remove();
        
        $.get(`templates/${templateFile}`, function(data) {
            const newSection = $(data);
            const controls = `
                <div class="section-controls">
                    <i class="fas fa-grip-vertical drag-handle" title="Drag to rearrange"></i>
                    <i class="fas fa-trash-alt delete-btn" title="Delete section"></i>
                </div>
            `;
            newSection.append(controls);
            canvas.append(newSection);

            // *** MODIFICATION: ACTIVATE SKILL GRID IF ABOUT SECTION IS ADDED ***
            if (templateFile === 'about-section.html') {
                newSection.find('.skills-grid').sortable({
                    placeholder: 'skill-sortable-placeholder',
                    forcePlaceholderSize: true
                }).disableSelection();
            }

            newSection.hide().fadeIn(600);
        });
    }

    // --- 3. IMPLEMENT DELETE SECTION FUNCTIONALITY ---
    canvas.on('click', '.delete-btn', function() {
        const wantsToDelete = confirm("Are you sure you want to delete this section?");
        if (wantsToDelete) {
            $(this).closest('.portfolio-section').fadeOut(400, function() {
                $(this).remove();
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

    // --- 4. DYNAMICALLY ADD NEW PROJECT CARDS ---
    canvas.on('click', '.add-project-card-btn', function() {
        const projectGrid = $(this).siblings('.project-grid');
        const newProjectCardHTML = `
            <div class="project-card">
                <button class="delete-card-btn" title="Delete Project">&times;</button>
                <img src="https://placehold.co/600x400/333/fff?text=New+Project" alt="Project Thumbnail">
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
    canvas.on('click', '.delete-card-btn', function(event) {
        event.stopPropagation();
        $(this).closest('.project-card').fadeOut(400, function() {
            $(this).remove();
        });
    });

    // *** NEW: --- 6. ADD NEW SKILL --- ***
    canvas.on('click', '.add-skill-btn', function() {
        const skillsGrid = $(this).siblings('.skills-grid');
        const newSkillHTML = `
            <div class="skill-item" contenteditable="true">
                <button class="delete-skill-btn">&times;</button>
                <i class="fas fa-star"></i> New Skill
            </div>
        `;
        $(skillsGrid).append(newSkillHTML);
        $(skillsGrid).children('.skill-item:last').hide().fadeIn(400);
    });

    // *** NEW: --- 7. DELETE INDIVIDUAL SKILL --- ***
    canvas.on('click', '.delete-skill-btn', function(event) {
        event.stopPropagation();
        $(this).closest('.skill-item').fadeOut(300, function() {
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