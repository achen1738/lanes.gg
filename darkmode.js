$(document).ready(function() {
	$("#darkmode").click(function() {
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
		}
	});
});