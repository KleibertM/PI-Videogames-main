const Validation = (input) => {
    let errors = {};
    let platformsRegex = /^[A-Za-z0-9-]+(?:, [A-Za-z0-9-]+)*$/;
    const imageRegex = /\.(jpg|png|svg|gif|jpeg)$/i;

    errors.name = !input.name ? 
    "Enter name" : 
    input.name.length >= 40 ? 
    "No more than 40 characters please" 
    : null;
    
    errors.description = !input.description ? 
    "Enter description please" : null;
    
    errors.platforms = !input.platforms ? 
    "You must write at least one platform" : 
    !platformsRegex.test(input.platforms) ? 
    "Each platform must be separated by comma." : null;
    
    errors.genres = !input.genres.length ? 
    "Select at least one genre" : null;
    
    errors.image = !input.image ? 
    "Upload an image" : 
    !imageRegex.test(input.image) ? 
    "Please enter a valid image URL in JPG, PNG, SVG, or GIF format." : null;

    errors.released = !input.released
        ? "Enter a release released" : null;

    errors.rating = !input.rating ? 
    "Enter a rating" : 
    (parseFloat(input.rating) < 1 || parseFloat(input.rating) > 5) ? 
    "Rating must be between 1 and 5" : null;

    return errors;
}

export default Validation;