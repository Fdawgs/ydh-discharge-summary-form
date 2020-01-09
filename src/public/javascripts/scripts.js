/**
 * @param {String} name - cookie name.
 */
// eslint-disable-next-line consistent-return
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return decodeURIComponent(
			decodeURI(
				parts
					.pop()
					.split(';')
					.shift()
			)
		);
	}
}

/**
 * @param {*} evt - event.
 * @param {*} tabName - id of element.
 * @description Switches the display of a tab.
 */
function openTab(evt, tabName) {
	const tabDivs = document.getElementsByClassName('tab-div');
	const tabButtons = document.getElementsByClassName('tab-button');
	const event = evt;

	for (let i = 0; i < tabDivs.length; i += 1) {
		tabDivs[i].style.display = 'none';
	}

	for (let i = 0; i < tabButtons.length; i += 1) {
		tabButtons[i].className = tabButtons[i].className.replace(
			' active',
			''
		);
	}
	document.getElementById(tabName).style.display = 'flex';
	event.currentTarget.className += ' active';
}

function selectToggle(selectId, selectOption, hiddenClass) {
	const element = document.getElementById(selectId);
	const hid = document.getElementsByClassName(hiddenClass);

	for (let index = 0; index < element.length; index += 1) {
		if (element[index].selected === true) {
			if (element[index].value !== selectOption) {
				for (let i = 0; i < hid.length; i += 1) {
					hid[i].style.display = 'block';
				}
			} else {
				for (let i = 0; i < hid.length; i += 1) {
					hid[i].style.display = 'none';
				}
			}
		}
	}
}

/**
 * @author Frazer Smith
 * @description Creates a new div element holding inputs for a new follow-up appointment.
 * @todo Refactor so that the inner html isn't a string but constructed.
 */
function addFollowUpBlock() {
	const newNode = document.createElement('div');
	newNode.classList.add('block');
	newNode.classList.add('form-block');
	newNode.innerHTML = `<span class="closebtn" title="Remove follow-up item" onclick="this.parentElement.remove();">&times;</span>
	<br>
	<div class="block">
		<label>Follow-Up With:</label>
		<select class="input" name="followup_with">
			<option value="" selected ></option>
			<option value="AEC">AEC</option>
			<option value="Community Pharmacy">Community Pharmacy</option>
			<option value="Community Rehab Team">Community Rehab Team</option>
			<option value="ICRT - Dorset">ICRT - Dorset</option>
			<option value="Dietician">Dietician</option>
			<option value="District Nurse">District Nurse</option>
			<option value="Dressing Clinic">Dressing Clinic</option>
			<option value="GP">GP</option>
			<option value="IRT - Somerset">IRT - Somerset</option>
			<option value="Other Hospital">Other Hospital</option>
			<option value="Patient to Arrange">Patient to Arrange</option>
			<option value="Practice Nurse">Practice Nurse</option>
			<option value="QCAC">QCAC</option>
			<option value="YDH">YDH</option>
		</select>
	</div>
	<div class="block">
		<label>When:</label>
		<input class="input" name="followup_intervalNumber" style="width: 10%" type="number" min="1" value="1">
		<select class="input" name="followup_interval" style="width: 25%">
			<option value="" selected ></option>
			<option value="Day(s)" selected >Day(s)</option>
			<option value="Week(s)">Week(s)</option>
			<option value="Month(s)">Month(s)</option>
		</select>
	</div>
	<div class="block">
		<label>Follow-Up Clinical Details:</label>
		<textarea class="input" name="followup_details"  cols="20" rows="4" spellcheck="true"
			></textarea>
	</div>
	<div class="block">
		<label>Follow-Up Notes:</label>
		<textarea class="input" name="followup_notes"  cols="20" rows="4" spellcheck="true"
			></textarea>
	</div>`;

	const referenceNode = document.querySelector('#follow-up-header');

	referenceNode.after(newNode);
}

/**
 * @param {string} className - name of class.
 * @description Hides all elements in a specified class.
 */
function hideClass(className) {
	const x = document.getElementsByClassName(className);
	for (let i = 0; i < x.length; i += 1) {
		x[i].style.display = 'none';
	}
}
/**
 * @param {string} className - name of class.
 * @description Unhides all elements in a specified class.
 */
function showClass(className) {
	const x = document.getElementsByClassName(className);
	for (let i = 0; i < x.length; i += 1) {
		x[i].style.display = 'block';
	}
}

/**
 * @param {string} className - name of class.
 * @description Uncheck all input checkboxes in a specified class.
 */
function uncheckRadio(className) {
	const x = document.getElementsByClassName(className);
	for (let i = 0; i < x.length; i += 1) {
		x[i].checked = false;
	}
}

/**
 * @param {string} className - name of class.
 * @description Unselect all option elements in a select element within a
 * specified class and resets to the first.
 */
function unselect(className) {
	const array = document.getElementsByClassName(className);
	for (let i = 0; i < array.length; i += 1) {
		array[i].selectedIndex = 0;
	}
}

/**
 * @param {string} className - name of class.
 * @description Set values to empty strings for elements within a specified class.
 */
function clearValue(className) {
	const array = document.getElementsByClassName(className);
	for (let i = 0; i < array.length; i += 1) {
		array[i].value = '';
	}
}

/**
 * @param {string} className - name of class.
 * @description Set values to empty strings for elements within a specified class.
 */
function changeFormAction(action) {
	const array = document.getElementsByTagName('form');
	for (let i = 0; i < array.length; i += 1) {
		array[i].action = action;
	}
}

/**
 * @author Frazer Smith
 * @param {*} that - HTML element.
 * @description Sets sign off elements inside an element with a 'sign-off' class.
 * This relies on the sign offs being structured in a specific way,
 * refer to already in place sign offs for an insight how to set them up.
 */
function signOff(that) {
	const date = new Date();
	const signOffDate = date.toISOString().slice(0, 10);
	const signOffTime = date.toLocaleTimeString();

	const signOffDiv = that.parentNode.parentNode;
	if (signOffDiv.className === 'sign-off') {
		for (let index = 0; index < signOffDiv.children.length; index += 1) {
			const block = signOffDiv.children[index].children;

			for (let index2 = 0; index2 < block.length; index2 += 1) {
				const element = block[index2];
				if (
					element.tagName === 'INPUT' &&
					element.type !== 'checkbox'
				) {
					if (element.value === '') {
						// Internet explorer doesn't support date or time inputs
						// Have to switch based on name of element rather than type
						switch (
							element.name
								.substring(
									element.name.length - 4,
									element.name.length
								)
								.toLowerCase()
						) {
							case 'date':
								element.value = signOffDate;
								break;
							case 'text':
							case 'name':
								element.value = document.getElementById(
									'user'
								).innerHTML;
								break;
							case 'time':
								element.value = signOffTime;
								break;
							default:
								break;
						}
					} else {
						// Have to remove readonly attribute to clear value for date and time
						element.removeAttribute('readonly');
						element.value = '';
						element.setAttribute('readonly', '');
					}
				}
			}
		}
	}
}

const useraccess = JSON.parse(getCookie('useraccess'));
