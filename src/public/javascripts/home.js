function collapse(that) {
	const element = that;
	element.classList.toggle('collapsible-active');
	const content = element.nextElementSibling;
	if (content.style.maxHeight) {
		content.style.maxHeight = null;
	} else {
		content.style.maxHeight = `${content.scrollHeight}px`;
	}
}
