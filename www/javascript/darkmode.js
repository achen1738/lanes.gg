$(document).ready(function() {
	var theme = localStorage.getItem('theme');
	if (theme == 'lightmode') {
		$('#d').addClass('light-mc');
		$('#a').addClass('light-sf');
		$('#r').addClass('light-sp');
		$('#k').addClass('light-spt');
		$('#m').addClass('light-spc');
		$('body').addClass('light');
	} else if (theme == 'darkmode') {
		$('#d').addClass('dark-mc');
		$('#a').addClass('dark-sf');
		$('#r').addClass('dark-sp');
		$('#k').addClass('dark-spt');
		$('#m').addClass('dark-spc');
		$('#o').addClass('darkText');
		$('.htext').addClass('dark-htext');
		$('.ptext').addClass('dark-ptext');
		$('body').addClass('dark');
	}
	$("#darkmode").click(function() {
		changeColors();
	});
});



function changeColors() {
	if ($('body').hasClass('light')) {
		$('#d').removeClass('light-mc');
		$('#d').addClass('dark-mc');
		$('#a').removeClass('light-sf');
		$('#a').addClass('dark-sf');
		$('#m').removeClass('light-sft');
		$('#m').addClass('dark-sft');
		$('#r').removeClass('light-sp');
		$('#r').addClass('dark-sp');
		$('#k').removeClass('light-spt');
		$('#k').addClass('dark-spt');
		$('#m').removeClass('light-spc');
		$('#m').addClass('dark-spc');
		$('.htext').addClass('dark-htext');
		$('.ptext').addClass('dark-ptext');
		$('body').removeClass('light');
		$('body').addClass('dark');
		localStorage.setItem("theme", 'darkmode');
	} else if ($('body').hasClass('dark')) {
		$('#d').removeClass('dark-mc');
		$('#d').addClass('light-mc');
		$('#a').removeClass('dark-sf');
		$('#a').addClass('light-sf');
		$('#m').removeClass('dark-sft');
		$('#m').addClass('light-sft');
		$('#r').removeClass('dark-sp');
		$('#r').addClass('light-sp');
		$('#k').removeClass('dark-spt');
		$('#k').addClass('light-spt');
		$('#m').removeClass('dark-spc');
		$('#m').addClass('light-spc');
		$('.htext').removeClass('dark-htext');
		$('.ptext').removeClass('dark-ptext');

		$('body').removeClass('dark');
		$('body').addClass('light');
		localStorage.setItem("theme", 'lightmode');
	}
}