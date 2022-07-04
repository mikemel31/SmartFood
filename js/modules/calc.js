const calc = function () {
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;
    sex = 'female';
    ratio = 1.375;
  
    function calcTotal () {
      if( !sex || !height || !weight || !age || !ratio) {
        result.textContent = '';
        return
      }
      if (sex === 'female') {
        result.textContent  = Math.round((447.6 + 9.2 * weight * 0.454 + 3.1 * height * 2.54 - 4.3 * age) * ratio)
      } else {
        result.textContent  = Math.round((88.36 + 13.4 * weight * 0.454 + 4.8 * height * 2.54 - 5.7 * age) * ratio)
      }
    }
    const activity = document.querySelector('.calculating__choose_big');
    const activityList = activity.querySelectorAll(`.calculating__choose-item`);
  
    function getRatio (e) {
      ratio = e.target.getAttribute('data-ratio');
      activityList.forEach(activity => activity.classList.remove('calculating__choose-item_active'))
      e.target.classList.add('calculating__choose-item_active')
      calcTotal()
    }
    activityList.forEach(act => act.addEventListener('click', (e) => getRatio(e)))
  
    document.querySelector('#height').addEventListener('change', (e) => {
      height = e.target.value
      calcTotal()
  })
  
    const genderSlider = document.querySelector('#gender'),
      genderChoiceList = genderSlider.querySelectorAll('.calculating__choose-item');
  
      genderChoiceList.forEach(gender => gender.addEventListener('click', (e) => getGender(e)))
    function getGender (e) {
      sex = e.target.id;
      genderChoiceList.forEach(gender => gender.classList.remove('calculating__choose-item_active'))
      e.target.classList.add('calculating__choose-item_active');
      calcTotal()
    }
  
    const ageField = document.querySelector('#age');
    ageField.addEventListener('change', (e) => {
      age = +e.target.value
      calcTotal()
    })
  
    const weightField = document.querySelector('#weight');
    weightField.addEventListener('change', (e) => {
      weight = +e.target.value
      calcTotal()
    })
  
    calcTotal()
}

export default calc;