"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const dataForm = document.getElementById("dataForm");
  const colorPalette = document.getElementById("colorPalette");
  const cells = document.querySelectorAll("td");

  dataForm.addEventListener("submit", handleSubmit);
  cells.forEach(addCellListeners);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(dataForm);
    const inputFields = document.querySelectorAll(
      "input[type='text'], input[type='email']"
    );

    const isValid = checkFormValidity(formData, inputFields);

    if (isValid) {
      displayUserInfo(formData);
    }
  }

  function checkFormValidity(formData, inputFields) {
    const regexPatterns = [
      /^[А-ЯІЇЄҐ]{6} [А-ЯІЇЄҐ]{1}.[А-ЯІЇЄҐ]{1}\.$/, // ПІБ: ТТТТТТ Т.Т.
      /^[0-9]{2}.[0-9]{2}.[0-9]{4}$/, // Дата народження: ЧЧ.ЧЧ.ЧЧЧЧ
      /^м. [0-9]{6}$/, // Адреса: м. ЧЧЧЧЧЧЧ
      /^[a-z]{6}@[a-z]{5}.com$/, // e-mail: тттттт@ттттт.com
      /^@[A-Z]{1}_[A-Z]{5}$/, // Telegram: @Т_ТТТТТ
    ];

    let isValid = true;

    inputFields.forEach((input, index) => {
      const value = formData.get(input.name);
      if (!regexPatterns[index].test(value)) {
        markInputAsInvalid(input);
        isValid = false;
      } else {
        markInputAsValid(input);
      }
    });
    return isValid;
  }

  function markInputAsInvalid(input) {
    input.style.border = "2px solid red";
  }

  function markInputAsValid(input) {
    input.style.border = "2px solid green";
  }

  function displayUserInfo(formData) {
    const userInfo = {
      name: formData.get("name"),
      birthday: formData.get("birthday"),
      address: formData.get("address"),
      email: formData.get("email"),
      telegram: formData.get("telegram"),
    };
    const userInfoWindow = window.open(
      "",
      "UserInfoWindow",
      "width=250, height=150"
    );
    userInfoWindow.document.write(`
      <h2>Введені дані</h2>
      <div><b>ПІБ:</b> ${userInfo["name"]}</div>
      <div><b>Дата народження:</b> ${userInfo["birthday"]}</div>
      <div><b>Адреса:</b> ${userInfo["address"]}</div>
      <div><b>e-mail:</b> ${userInfo["email"]}</div>
      <div><b>Telegram:</b> ${userInfo["telegram"]}</div>
    `);
  }

  function addCellListeners(cell, index) {
    if (index === 5) {
      cell.addEventListener("mouseover", function () {
        cell.style.backgroundColor = getRandomColor();
      });

      cell.addEventListener("click", function () {
        const selectedColor = colorPalette.value;
        cell.style.backgroundColor = selectedColor;
      });

      cell.addEventListener("dblclick", function () {
        const rowIndex = cell.parentElement.rowIndex;
        const cellIndex = cell.cellIndex;

        const startRowIndex = Math.min(rowIndex, 5);
        const endRowIndex = Math.max(rowIndex, 5);
        const startCellIndex = Math.min(cellIndex, 5);
        const endCellIndex = Math.max(cellIndex, 5);
        const selectedColor = colorPalette.value;

        for (let i = startRowIndex; i <= endRowIndex; i++) {
          for (let j = startCellIndex; j <= endCellIndex; j++) {
            cells[i * 6 + j].style.backgroundColor = selectedColor;
          }
        }
      });
    }
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});
