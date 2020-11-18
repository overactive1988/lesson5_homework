$(function() {
    $('.view-btn i').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('_this-open');
        $(this).closest('.modal-content').find('.modal-footer').slideToggle();
    });
});