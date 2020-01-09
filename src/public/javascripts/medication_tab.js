/**
 * @author Frazer Smith
 * @description Creates a new div element holding inputs for a new medication/TTO.
 * @todo Refactor so that the inner html isn't a string but constructed.
 */
function addMedicationBlock() {
	const newNode = document.createElement('div');
	newNode.classList.add('block');
	newNode.classList.add('form-block');

	newNode.innerHTML = `<span title="Remove medication item" class="closebtn" onclick="this.parentElement.remove();">&times;</span>

	<br><br>
	<div class="half-column">
		<div class="block">
			<label>Medication:</label>
			<input class="input ${useraccess.transcribe.disabled}" type="text" name="medication_ttoMedication" value="" onchange="highRiskDrugCheck(this)" ${useraccess.transcribe.readonly}/>
		</div>
	
		<div class="block">
			<label style="width: 15%">Dose:</label>
			<input style="width: 30%" class="input ${useraccess.transcribe.disabled}" name="medication_ttoDose" type="number" min="1" value="1" ${useraccess.transcribe.readonly}/>
			<label style="width: 15%">Unit:</label>

			<input style="width:30%;" class="input ${useraccess.transcribe.disabled}" list="medicationTtoUnits" name="medication_ttoUnit">
			<datalist id="medicationTtoUnits">
				<option value=""></option>
				<option value="application">application</option>
				<option value="applicatorful">applicatorful</option>
				<option value="bottle(s)">bottle(s)</option>
				<option value="caplet">caplet</option>
				<option value="capsule">capsule</option>
				<option value="drop(s)">drop(s)</option>
				<option value="g">g</option>
				<option value="mcg">mcg</option>
				<option value="mg">mg</option>
				<option value="ml">ml</option>
				<option value="ng">ng</option>
				<option value="patch">patch</option>
				<option value="pessary">pessary</option>
				<option value="puff(s)">puff(s)</option>
				<option value="sachet">sachet</option>
				<option value="spray(s)">spray(s)</option>
				<option value="suppository">suppository</option>
				<option value="tablet">tablet</option>
				<option value="units">units</option>
			</datalist>
		</div>
	
		<div class="block">
			<label>Route:</label>

			<input class="input ${useraccess.transcribe.disabled}" list="medicationTtoRoutes" name="medication_ttoRoute">
			<datalist id="medicationTtoRoutes">
				<option value=""></option>
				<option value="BUC - Buccal">BUC - Buccal</option>
				<option value="IA - Intraartciular">IA - Intraartciular</option>
				<option value="IM - Intramuscular">IM - Intramuscular</option>
				<option value="INH - By inhilation">INH - By inhilation</option>
				<option value="Intraoccular">Intraoccular</option>
				<option value="Intravitreal">Intravitreal</option>
				<option value="IV - Intravenous">IV - Intravenous</option>
				<option value="NEB - By nebulisation">NEB - By nebulisation</option>
				<option value="NG - By nasogastric tube">NG - By nasogastric tube</option>
				<option value="PEG">PEG</option>
				<option value="PO - Oral">PO - Oral</option>
				<option value="PR - Rectal">PR - Rectal</option>
				<option value="PV - Vaginal">PV - Vaginal</option>
				<option value="SC - Subcutaneous">SC - Subcutaneous</option>
				<option value="SL - Sublingual">SL - Sublingual</option>
				<option value="TD - Transdermal">TD - Transdermal</option>
				<option value="TOP - Topical">TOP - Topical</option>
			</datalist>
		</div>

	</div>
	
	<div class="half-column">
	
		<div class="block">
			<label>Frequency:</label>
			<input class="input ${useraccess.transcribe.disabled}" list="medicationTtoFrequencies" name="medication_ttoFrequency">
			<datalist id="medicationTtoFrequencies">
				<option value=""></option>
				<option value="5 times per day">5 times per day</option>
				<option value="Alternate days">Alternate days</option>
				<option value="As directed">As directed</option>
				<option value="BD PRN - twice daily as needed">BD PRN - twice daily as needed</option>
				<option value="BD - twice daily">BD - twice daily</option>
				<option value="OD - once daily">OD - once daily</option>
				<option value="OD PRN - once daily as needed">OD PRN - once daily as needed</option>
				<option value="OM - once each morning">OM - once each morning</option>
				<option value="ON - once each night">ON - once each night</option>
				<option value="Once at lunchtime">Once at lunchtime</option>
				<option value="Once at suppertime">Once at suppertime</option>
				<option value="Once weekly">Once weekly</option>
				<option value="PRN - as needed">PRN - as needed</option>
				<option value="QDS - 4 times per day">QDS - 4 times per day</option>
				<option value="QDS PRN - 4 times per day as needed">QDS PRN - 4 times per day as needed</option>
				<option value="TDS - 3 times per day">TDS - 3 times per day</option>
				<option value="TDS PRN - 3 times per day as needed">TDS PRN - 3 times per day as needed</option>
			</datalist>
		</div>
	
		<div class="block">
			<label>Start Date:</label>
			<input class="input ${useraccess.transcribe.disabled}" type="date" name="medication_ttoStartDate value="" ${useraccess.transcribe.readonly}/>
		</div>
		<div class="block">
			<label>Length of Course:</label>
			<input class="input ${useraccess.transcribe.disabled}" list="medicationTtoLengthOfCourses"
			name="medication_ttoLengthOfCourse" ${useraccess.transcribe.readonly}>
			<datalist id="medicationTtoLengthOfCourses">
				<option value=""></option>
				<option value="1 day">1 day</option>
				<option value="2 days">2 days</option>
				<option value="3 days">3 days</option>
				<option value="4 days">4 days</option>
				<option value="5 days">5 days</option>
				<option value="6 days">6 days</option>
				<option value="7 days">7 days</option>
				<option value="8 days">8 days</option>
				<option value="9 days">9 days</option>
				<option value="10 days">10 days</option>
				<option value="11 days">11 days</option>
				<option value="12 days">12 days</option>
				<option value="13 days">13 days</option>
				<option value="14 days">14 days</option>
				<option value="Ongoing">Ongoing</option>
			</datalist>

		</div>
	
		<div class="block">
			<label>Comments:</label>
			<textarea class="input ${useraccess.transcribe.disabled}" name="medication_ttoComments" cols="20" rows="4" spellcheck="true"
				 ${useraccess.transcribe.readonly}></textarea>
		</div>
	</div>
	
	<div class="full-column" style="display: block">
		<hr>
	</div>
	
	<div class="half-column">
		<div class="block">
			<label>
				<h3>Pharmacy Sign Off</h3>
			</label>
		</div>
		<div class="block">
			<label>
				<h4>Pharmacy Clinical Screen</h4>
			</label>
		</div>
		<div class="sign-off">
			<div class="block">
				<label>I confirm this TTO is correct:</label>
				<input class="binaryinput ${useraccess.pharmacy.disabled}" type="checkbox" name="medication_ttoPharmacySignOffCheck"
					title="Confirm TTO correct" onclick="signOff(this);" ${useraccess.pharmacy.disabled}>
	
			</div>
	
	
			<div class="block">
				<label>Name:</label>
				<input class="input disabled" type="text" name="medication_ttoPharmacySignOffName" value="" readonly>
			</div>
	
			<div class="block">
				<label>Date:</label>
				<input class="input disabled" type="date" name="medication_ttoPharmacySignOffDate" value="" readonly>
			</div>
	
			<div class="block">
				<label>Time:</label>
				<input class="input disabled" type="time" name="medication_ttoPharmacySignOffTime" value="" readonly>
			</div>
		</div>
	</div>
	
	<div class="half-column">
	
		<div class="block">
			<label>
			</label>
		</div>
	
		<div class="block">
			<label>Availability:</label>
			<select class="input ${useraccess.pharmacy.disabled}" name="medication_ttoPharmacyAvailability">
				<option value="" ${useraccess.pharmacy.disabled}></option>
				<option value="CD Prescription" ${useraccess.pharmacy.disabled}>CD Prescription</option>
				<option value="For Dispensing" style="background-color: green;" ${useraccess.pharmacy.disabled}>For Dispensing</option>
				<option value="Kitchen" ${useraccess.pharmacy.disabled}>Kitchen</option>
				<option value="Not Dispensed" ${useraccess.pharmacy.disabled}>Not Dispensed</option>
				<option value="On Ward" ${useraccess.pharmacy.disabled}>On Ward</option>
				<option value="Ordered from Pharmacy today" ${useraccess.pharmacy.disabled}>Ordered from Pharmacy today</option>
				<option value="PODs (At Home)" ${useraccess.pharmacy.disabled}>PODs (At Home)</option>
				<option value="PODs (Blister Pack)" ${useraccess.pharmacy.disabled}>PODs (Blister Pack)</option>
				<option value="PODs (Patient Locker)" ${useraccess.pharmacy.disabled}>PODs (Patient Locker)</option>
				<option value="TTO pack on ward" ${useraccess.pharmacy.disabled}>TTO pack on ward</option>
			</select>
		</div>
	
	
		<div class="block">
			<label>
				<h4>Pharmacy Final Check</h4>
			</label>
		</div>
		<div class="sign-off">
			<div class="block">
				<label>I confirm this TTO is correct:</label>
				<input class="binaryinput ${useraccess.pharmacy.disabled}" type="checkbox" name="medication_finalPharmacySignOffCheck"
					title="Confirm TTO correct" onclick="signOff(this);" ${useraccess.pharmacy.disabled}>
	
			</div>
			<div class="block">
				<label>Name:</label>
				<input class="input disabled" type="text" name="medication_finalPharmacySignOffName" value="" readonly>
			</div>
			<div class="block">
				<label>Date:</label>
				<input class="input disabled" type="date" name="medication_finalPharmacySignOffDate" value="" readonly>
			</div>
			<div class="block">
				<label>Time:</label>
				<input class="input disabled" type="time" name="medication_finalPharmacySignOffTime" value="" readonly>
			</div>
		</div>
	</div>`;

	const referenceNode = document.querySelector('#ttos-header');
	referenceNode.after(newNode);
}

/**
 * @author Frazer Smith
 * @description Creates a new div element holding inputs for a new medication change.
 * @todo Refactor so that the inner html isn't a string but constructed.
 */
function addMedicationChangeBlock() {
	const newNode = document.createElement('div');
	const date = new Date();
	newNode.classList.add('block');
	newNode.classList.add('form-block');
	newNode.innerHTML = `<span title="Remove medication item" class="closebtn" onclick="this.parentElement.remove();">&times;</span>
	<br><br>
	<div class="block">
		<label>Medication Changed:</label>
		<input class="input" type="text" name="medication_changedMed" value="" />
	</div>

	<div class="block">
		<label>Reason For Change:</label>
		<input class="input" type="text" name="medication_changedReason" value="" />
	</div>

	<div class="block">
		<label>Future Plan For This Medication:</label>
		<select class="input" name="medication_changedPlan">
		<option value="" selected ></option>
		<option value="Complete the prescribed course">Complete the prescribed course</option>
		<option value="Continue as prescribed">Continue as prescribed</option>
		<option value="Not to be restarted">Not to be restarted</option>
		<option value="Restart after clinical review">Restart after clinical review</option>
		<option value="Review needed by GP">Review needed by GP</option>
		<option value="Started during admission">Started during admission</option>
	</select>
	</div>`;

	const referenceNode = document.querySelector('#medchange-header');
	referenceNode.after(newNode);
}

/**
 * @author Frazer Smith
 * @param {*} that
 * @description Sets the comments automatically for a medication if it is considered high risk.
 */
function highRiskDrugCheck(that) {
	const drugList = [
		{
			name: 'insulin',
			text: 'GUIDANCE: Check correct dosage, presentation and units'
		},
		{
			name: 'methotrexate',
			text:
				'GUIDANCE: Ensure and comment that arrangements have been made for regular blood tests. CAUTION: interaction with Spetrin and Trimethoprin. Should only be prescribed weekly'
		},
		{
			name: 'warfarin',
			text:
				'GUIDANCE: Ensure and comment that arrangements for INR checks have been made'
		}
	];

	let ttoDiv = that;

	for (let i = 0; i < drugList.length; i += 1) {
		if (that.value.toLowerCase() === drugList[i].name) {
			// block -> column -> block
			ttoDiv = that.parentNode.parentNode.parentNode;

			if (ttoDiv.classList.contains('form-block')) {
				// columns
				for (let j = 0; j < ttoDiv.children.length; j += 1) {
					// blocks
					for (
						let k = 0;
						k < ttoDiv.children[j].children.length;
						k += 1
					) {
						// inputs
						for (
							let l = 0;
							l < ttoDiv.children[j].children[k].children.length;
							l += 1
						) {
							const element =
								ttoDiv.children[j].children[k].children[l];
							if (element.name === 'medication_ttoComments') {
								element.value += drugList[i].text;
							}
						}
					}
				}
			}
		}
	}
	return ttoDiv;
}
