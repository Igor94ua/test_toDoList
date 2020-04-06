// 1. Добавление задачи

// Прослушиваем форму
var form = document.getElementById('addForm');
// Прослушиваем список
var Itemlist = document.getElementById("items");
// Прослушиваем фильтр
var filter = document.getElementById('filter');

// Прослушиваем событие
form.addEventListener('submit', addItem);

// Функция для добавления задачи
function addItem (e){
    // Отменяем отправку формы
    e.preventDefault();    

    // Находим инпут с текстом для новой задачи
    var newItemInput = document.getElementById('newItemText');
    
    // Получаем текст из инпута
    var newItemText = newItemInput.value;
    console.log("addItem -> newItemText", newItemText);
    
    // Создаем элемент для новой задачи
    var newElement = document.createElement('li');
    // Добавляем ему класс
    newElement.className = 'list-group-item';
    console.log(newElement);
     // Добавляем ему текст (текстовую ноду)
    var newTextNode = document.createTextNode(newItemText);
    console.log(newTextNode);
     // Добавляем один элемент в другой
     newElement.appendChild(newTextNode);
    console.log(newElement);

    // Создаем кнопку Удалить
    var deleteBtn = document.createElement("button");
    // Добавляем текст
    deleteBtn.appendChild(document.createTextNode("Удалить"));
    // Добавляем класс
    deleteBtn.className = "btn btn-light btn-sm float-right";
    // Добавляем дата-атрибут
    deleteBtn.dataset.action = "delete";
    console.log("addItem -> deleteBtn", deleteBtn);

    //  Помещаем кнопку внутрь тега Ли
    newElement.appendChild(deleteBtn);
    console.log(newElement);

    // Объявляем вверху переменную Itemlist, для прослушки ul
    // Добавляем новую задачу в список дел
    Itemlist.prepend(newElement);

    // Очистим поле добавления новой задачи, т.е инпут куда вводим задачу
    newItemInput.value = '';
} 

// Удаление элемента ( нашей задачи ) из списка
// Обращаемся к itemsList добавляем метод и прослушиваем клик и запускаем функцию.
Itemlist.addEventListener('click', removeItem);

//  Функция удаления
function removeItem(e) {
    // Пока что у нас происходит прослушка по всему списку ul
    console.log('Tik');
    // Смотрит в каком месте произошел клик
    console.log(e.target);

    // Пишем условие ( если он имеет атрибут data-action и если он чему-то равен ( в нашем случае delete) )

    // hasAttribute передаем атрибут и он смотрит есть ли он, 
    // getAttribute возвращает значение, есть ли такое у атрибута.
    if ( e.target.hasAttribute('data-action') && e.target.getAttribute('data-action') == "delete") {
        if ( confirm("Удалить задачу?") ) {
// обращаемся к родителю, parentNode возвращает родителя и удаляем его со страницы свойством remove
            e.target.parentNode.remove();
        }
    }
}

// Фильтрация списка дел - прослушка ввода
filter.addEventListener('keyup', filterItems);

function filterItems (e) {
    // Получаем фразу и приводим к нижнему регистру, методом toLowerCase
    var searchedText = e.target.value.toLowerCase();

    // Получаем списое всех дел
    var items = Itemlist.querySelectorAll("li");

    // Перебираем циклом все найденные теги li с задачами
    items.forEach( function(item) {
        // Получаем текст задачи из списка и переводим в нижний регистр
        var itemText = item.firstChild.textContent.toLowerCase();
    
        // Проверяем вхождение искомой подстроки в текст задачи
        // Принимает searchedText и возвращает его позицию с которой этот текст начинается, если он найден, то он вернет индекс этой буквы с которой наша подстрока входит в строку. Если не найдено вернет -1
        if (itemText.indexOf(searchedText) != -1) {
            // Если не -1, то мы показываем найденный блок li
            item.style.display = "block";
        } else {
            // Если нет, скрываем
            item.style.display = "none";
        }
    })
    console.log(item.firstChild.textContent);
}