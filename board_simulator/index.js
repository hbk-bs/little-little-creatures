// @ts-check

let inputCount = 1;
document.addEventListener('DOMContentLoaded', function () {
  const addInput = document.getElementById('add-input');
  const inputContainer = document.getElementById('input-container');
  const form = document.getElementById('dynamic-form');
  const code = document.querySelector('.response > pre > code');
  if (code === null) throw new Error('response element not found');
  if (form === null) throw new Error('dynamic-form not found');
  if (inputContainer === null) throw new Error('input-container not found');
  if (addInput === null) throw new Error('add-input not found');

  addInput.addEventListener('click', function () {
    inputCount++;
    var inputContainer = document.getElementById('input-container');
    var newInputGroup = document.createElement('div');
    newInputGroup.className = 'input-group';
    newInputGroup.innerHTML = `<input type="number" name="number-input-${inputCount}" value="${Math.floor(
      Math.random() * 100,
    )}" required> <button type="button" class="remove-input" >Remove</button>`;
    inputContainer.appendChild(newInputGroup);
  });

  inputContainer.addEventListener('click', function (e) {
    if (e.target && e.target.className == 'remove-input') {
      e.target.parentNode.remove();
    }
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData);
    const channel = formData.get('channel-name');
    const host = formData.get('host-name');
    // get all values from elements named number-input-1, number-input-2, etc.
    // into an array called measurements
    // filter all elements that are not a numberNaN
    const measurements = Array.from(formData)
      .map((numberInput) => Number(numberInput[1]))
      .filter((value) => !isNaN(value));
    console.log(measurements);
    try {
      const response = await fetch(`http://${host}/arduino`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel,
          measurements,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        code.innerText = json;
      } else {
        const json = await response.text();
        console.log(json);
        code.innerText = json;
      }
    } catch (error) {
      console.error(error);
      code.innerText = error.message;
    }
  });
});
