'use strict';
let petList = [];
let pet = {};

//get id html of table
let tableListHTML = document.getElementById('pet-list');

//html of icon check or not check
const checkBoxHTML = function (checkStatus) {
  //checkStatus is boolean true or fase
  let textHTML = '';
  if (checkStatus) {
    textHTML = `<td><i class="bi bi-check-circle-fill"></i></td>`;
  } else {
    textHTML = `<td><i class="bi bi-x-circle-fill"></i></td>`;
  }
  return textHTML;
};

const bmiElBtn = document.getElementById('bmi-btn');
const displayPetList = function (array) {
  if (array.length < 1) {
    tableListHTML.innerHTML = '';
  } else {
    let tableInnerHTML = '';
    tableInnerHTML = `<thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Type</th>
      <th scope="col">Weight</th>
      <th scope="col">Length</th>
      <th scope="col">Breed</th>
      <th scope="col">Color</th>
      <th scope="col">Vaccinated</th>
      <th scope="col">Dewormed</th>
      <th scope="col">Sterilized</th>
      <th scope="col">BMI</th>
      <th scope="col">Date Added</th>
      <th scope="col">Action</th>
    </tr>
  </thead><tbody id="tbody">`;
    for (let i = 0; i < array.length; i++) {
      tableInnerHTML += `<tr id="tr-${array[i].petId}">
    <th scope="row">${array[i].petId}</th>
    <td>${array[i].petName}</td>
    <td>${array[i].petAge}</td>
    <td>${array[i].petType}</td>
    <td>${array[i].petWeight} kg</td>
    <td>${array[i].petLength} cm</td>
    <td>${array[i].petBreed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${array[i].petColor}"></i>
    </td>`;
      tableInnerHTML += checkBoxHTML(array[i].petVaccinated);
      tableInnerHTML += checkBoxHTML(array[i].petDewormed);
      tableInnerHTML += checkBoxHTML(array[i].petSterilized);
      tableInnerHTML += '<td class="bmi">?</td>';

      tableInnerHTML += `
      <td>${array[i].date}</td>
    <td>
      <button type="button" class="btn btn-danger" id="d-${array[i].petId}">Delete</button>
    </td>
  </tr>
  `;
    }
    tableInnerHTML += `</tbody>`;
    tableListHTML.innerHTML = tableInnerHTML;
    //display BMI
    const bmiIdEl = document.querySelectorAll('.bmi');
    let bmiClicked = false;
    bmiElBtn.addEventListener('click', function () {
      bmiClicked = true;
      for (let i = 0; i < bmiIdEl.length; i++) {
        if (bmiClicked) {
          bmiIdEl[i].innerHTML = `${array[i].calcBMI()}`;
        }
      }
      bmiClicked = false;
    });
    //delete click event
    const deleteEl = document.querySelectorAll('.btn-danger');
    for (let i = 0; i < deleteEl.length; i++) {
      deleteEl[i].addEventListener('click', function () {
        //console.log(1);
        //someArray = someArray.filter(person => person.name != 'John');
        let delId = Number(deleteEl[i].id.slice(2));
        let index;
        //delete array
        for (let j = 0; j < array.length; j++) {
          if (array[j].petId === delId) {
            index = j;
          }
        }
        array.splice(index, 1);

        //remove row table
        let tr = document.getElementById(`tr-${delId}`);
        tr.remove();

        //petList = petList.filter(pet => pet.petId != delId);
        //remove thead table
        if (array.length < 1) {
          tableListHTML.innerHTML = '';
        }
      });
    }
  }
};

//check healthy pets or all pets
let healthyEl = document.getElementById('healthy-btn');
let showHealthyPet = true;
healthyEl.addEventListener('click', function () {
  if (showHealthyPet) {
    showHealthyPet = false;
    healthyEl.textContent = 'Show all Pets';
    let healthyPetList = petList.filter(pet => pet.petHealthy());
    displayPetList(healthyPetList);
  } else {
    showHealthyPet = true;
    healthyEl.textContent = 'Show healthy pet';
    displayPetList(petList);
  }
});

//submit pet to array
let petIdEl = 0;
const submitEl = document.getElementById('submit-btn');
submitEl.addEventListener('click', function () {
  //console.log(1);
  //for (let i = 0; i < 3; i++) {
  //Get data form
  //const petIdEl = document.getElementById('input-id').value;
  petIdEl++;
  const petNameEl = document.getElementById('input-name').value;
  const petAgeEl = document.getElementById('input-age').value;
  let petTypeEl = document.getElementById('input-type').value;
  petTypeEl = 'Dog';
  const petWeightEl = document.getElementById('input-weight').value;
  const petLengthEl = document.getElementById('input-length').value;
  const petColorEl = document.getElementById('input-color-1').value;
  let petBreedEl = document.getElementById('input-breed').value;
  petBreedEl = 'Tapple';
  const petVaccinatedEl = document.getElementById('input-vaccinated').checked;
  const petDewormedEl = document.getElementById('input-dewormed').checked;
  const petSterilizedEl = document.getElementById('input-sterilized').checked;

  //create pet object
  pet = {
    petId: petIdEl,
    petName: petNameEl,
    petAge: petAgeEl,
    petType: petTypeEl,
    petWeight: petWeightEl,
    petLength: petLengthEl,
    petColor: petColorEl,
    petBreed: petBreedEl,
    date: new Date(),
    petVaccinated: petVaccinatedEl,
    petDewormed: petDewormedEl,
    petSterilized: petSterilizedEl,
    //bmi: 0,
    petHealthy: function () {
      if (this.petVaccinated && this.petDewormed && this.petSterilized) {
        return true;
      } else return false;
    },
    calcBMI: function () {
      let bmi = (this.petWeight * 703) / this.petLength ** 2;
      return bmi.toFixed(2);
    },
  };
  const inputValidated = function () {
    let inputId = false;
    let inputAge = false;
    let inputWeight = false;
    let inputLength = false;
    let inputType = false;
    let inputBreed = false;

    //print span error
    let ageError = document.getElementById('age-error');
    let weightError = document.getElementById('weight-error');
    let lengthError = document.getElementById('length-error');
    let typeError = document.getElementById('type-error');
    let breedError = document.getElementById('breed-error');
    let idError = document.getElementById('id-error');

    //reset span error
    ageError.innerHTML = '';
    weightError.innerHTML = '';
    lengthError.innerHTML = '';
    typeError.innerHTML = '';
    breedError.innerHTML = '';
    idError.innerHTML = '';

    //check Age input 1 - 15
    if (petAgeEl >= 1 && petAgeEl <= 15) {
      inputAge = true;
    } else {
      ageError.innerHTML = 'Age must be between 1 and 15!';
    }
    //check Weight input 1-15
    if (petWeightEl >= 1 && petWeightEl <= 15) {
      inputWeight = true;
    } else {
      weightError.innerHTML = 'Weight must be between 1 and 15!';
    }
    //check Length input 1-100
    if (petLengthEl >= 1 && petLengthEl <= 100) {
      inputLength = true;
    } else {
      lengthError.innerHTML = 'Length must be between 1 and 100!';
    }
    //check type input or print "Please select Type!"
    if (petTypeEl !== 'Select Type') {
      inputType = true;
    } else {
      typeError.innerHTML = 'Please select Type!';
    }
    //check breed input or print "Please select Breed!"
    if (petBreedEl !== 'Select Breed') {
      inputBreed = true;
    } else {
      breedError.innerHTML = 'Please select Breed!';
    }
    //check pet id input
    inputId = petList.find(pet => pet.petId === petIdEl);

    if (petIdEl === '') {
      idError.innerHTML = 'ID must be fill!';
      inputId = false;
    } else if (inputId) {
      inputId = false;
      idError.innerHTML = 'ID must be unique!';
    } else {
      inputId = true;
    }

    //check true will add pet to list or not
    let checkValidate =
      inputId &&
      inputAge &&
      inputWeight &&
      inputLength &&
      inputType &&
      inputBreed;
    if (checkValidate) {
      return true;
    } else {
      return false;
    }
  };

  if (inputValidated()) {
    petList.push(pet);
    displayPetList(petList);
  }
  //}
});
