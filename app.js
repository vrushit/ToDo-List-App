// . Add Event listeners
// . Add todays Date and time
// . Updating the UI
// . Proper Controller Modules
// . Deletions of the Done Task
// . Proper Tsk Competion

var tasks = 0;

// TODO List COntroller
var todoListController = (function(){

    //Data Model for Inputs 

    var todoList = function(id, description,timing)
    {
        this.id = id;
        this.description = description;
        this.timing = timing;

    };

     

    var data = {

        allItems: {
            todos : []
        },
        totals: {
            todos: 0
        }

    };

    return {

        addItem: function(desc, num){

            var newItem;
            
            // Create ID 

            if(data.allItems.todos.length > 0)
            {
                ID = data.allItems.todos[data.allItems.todos.length -1].id +1;
                tasks++;

            }
            else{
                ID =0;
            }

            //Create new Item
            newItem  = new todoList(ID, desc,num);

            //Push it into our Data Structure
            data.allItems.todos.push(newItem);
            return newItem;

          },

          deleteItem: function(id){

            var ids, index;
                
          var ids = data.allItems.todos.map(function(curr){

            // Map returns a brand new Array

            return curr.id;

           }); 

           index = ids.indexOf(id);

           if(index !== -1)
           {
               data.allItems.todos.splice(index,1);  //Deleing the Elements

           }

          },
          calculateTasks:function(){

            return{
                size: data.allItems.todos.length
            };
            
        },
          

          testing: function()
          {
              console.log(data);
          }
    };

})();


// UICOntroller 
var UIController = (function(){

    
    var DOMStrings = {

        inputDesription: '.add__description',
        inputTiming : '.add__value',
        addBtn: '.add__btn',
        incomeContainer: '.i__list',
        budgetLabel: '.TODO__value',
        container:'.container'
        
    };


    return {
        getinput: function(){

            return{
                 description:document.querySelector(DOMStrings.inputDesription).value,
             timing:document.querySelector(DOMStrings.inputTiming).value
  
                    };
                  },

                  addListItem:function(obj) {

                    var html,newHTML,element;
                    //  Create html string with placeholder text

                    element = DOMStrings.incomeContainer;
                    var html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%timings%</div> <div class="item__delete"> <button class="item__delete--btn"> <i class="ion-ios-close-outline"></i> </button> </div> </div> </div>'

                    //Replace the Placeholde text with actual data

                    newHTML = html.replace('%id%',obj.id);
                    newHTML = newHTML.replace('%description%',obj.description);
                    newHTML = newHTML.replace('%timings%',obj.timing);

                    // Insert the html into the dom
                    document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);

                  },

                  deleteListItem: function(selectorID){

                    var elementSelect = document.getElementById(selectorID);

                    elementSelect.parentNode.removeChild(elementSelect);


                  },

                  clearFields: function(){
                    var fields,fieldsArr;
                  fields = document.querySelectorAll(DOMStrings.inputDesription + ', ' +  DOMStrings.inputTiming)
                  
                fieldsArr =  Array.prototype.slice.call(fields);

                fieldsArr.forEach(function(curr, i, arr){

                    curr.value = "";
                });

                fieldsArr[0].focus();

                  },
                  getDOMstrings: function(){
                      return DOMStrings;
                  }
    };



})();


// Main App Controller
var controller = (function(todoCtrl,UICtrl){

    var setupEventListeners = function(){

        var DOM = UICtrl.getDOMstrings();


        document.querySelector(DOM.addBtn).addEventListener('click',controlAddItem);


    document.addEventListener('keypress',function(event){

        if(event.keyCode === 13 || event.which === 13)
        {
                controlAddItem();
        }
    });

    document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
    };


    var updateAll = function(){

       var task =  todoCtrl.calculateTasks();

        document.querySelector('.TODO__value').textContent = task.size;

    };



    //Central Place for the Control

    var controlAddItem = function(){

        var input,newItem;

        // 1. Get the Input from the User



         input = UICtrl.getinput();

         if(input.description !== "" && input.timing !== "")
         {
  // 2. Add the item to the Todo List
  newItem =  todoCtrl.addItem(input.description,input.timing);
  UICtrl.addListItem(newItem);
   UICtrl.clearFields();

   // 3. Number of Tasks Left
       



   // 4. Display the Tasks
           updateAll();

         }

      
   
    };

    var ctrlDeleteItem = function(event){

        //console.log(event.target);

        var itemID,splitID,type,ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID)
        {
            splitID = itemID.split('-');
            type = splitID[0];

            ID = parseInt(splitID[1]);
            // 1. Delete the Item from the data structure

            todoCtrl.deleteItem(ID);

            // 2. Delete The item from the UI

            UICtrl.deleteListItem(itemID);

            updateAll();


        }

    };

    return{
        init: function(){
            var today = new Date();

    var date = today.getDate();
    var month = today.getMonth()+ 1;
    var year = today.getFullYear();
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'];

    var todaysDay = today.getDay();

            var todayDate = date+'-'+month+'-'+year;

            document.querySelector('.TODO__value').textContent = 0;
            document.querySelector('.TODO__i--value').textContent =  days[todaysDay];
            document.querySelector('.TODO__title--month').textContent = todayDate;
            
            console.log("Application has Started");

            setupEventListeners();
        }
    }

})(todoListController, UIController);

controller.init();

