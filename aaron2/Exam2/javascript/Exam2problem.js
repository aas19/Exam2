var area = document.getElementById("area");



area.addEventListener("change", function() {
    if (area.value == "show1") {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(xhttp.responseText)
                var customers = response.GetAllCategoriesResult;
                var text = ''
                for (var i = 1; i < customers.length; i++) {
                    var temp = '<tr><td>' + customers[i].CID + '</td><td>' + customers[i].CName + '</td><td>' + customers[i].CDescription + '</td></tr>'
                    text += temp;
                }
                document.getElementById('categoryDetails').innerHTML = text

            }
        };
        xhttp.open("GET", "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories", true);
        xhttp.send();
        document.getElementById('section2').style.display = 'none'
        document.getElementById('section3').style.display = 'none'
        document.getElementById('section4').style.display = 'none'
        document.getElementById('section5').style.display = 'none'
        document.getElementById('section1').style.display = 'block'
    } else if (area.value == "show2") {
        document.getElementById('section1').style.display = 'none'
        document.getElementById('section3').style.display = 'none'
        document.getElementById('section2').style.display = 'block'
        document.getElementById('section4').style.display = 'none'
        document.getElementById('section5').style.display = 'none'
    } else if (area.value == "show3") {
        document.getElementById('section1').style.display = 'none'
        document.getElementById('section3').style.display = 'block'
        document.getElementById('section2').style.display = 'none'
        document.getElementById('section4').style.display = 'none'
        document.getElementById('section5').style.display = 'none'
    } else if (area.value == "show4") {
        document.getElementById('section1').style.display = 'none'
        document.getElementById('section3').style.display = 'none'
        document.getElementById('section2').style.display = 'none'
        document.getElementById('section4').style.display = 'block'
        document.getElementById('section5').style.display = 'none'
    } else if (area.value == "show5") {
        document.getElementById('section1').style.display = 'none'
        document.getElementById('section3').style.display = 'none'
        document.getElementById('section2').style.display = 'none'
        document.getElementById('section4').style.display = 'none'
        document.getElementById('section5').style.display = 'block'
    } else {
        document.getElementById('section1').style.display = 'none'
        document.getElementById('section2').style.display = 'none'
        document.getElementById('section3').style.display = 'none'
        document.getElementById('section4').style.display = 'none'
        document.getElementById('section5').style.display = 'none'
    }
});


function createCategory() {
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";

    //Collect Customer data from the web page
    var categoryName = document.getElementById("categoryName").value;
    var categoryDesc = document.getElementById("categoryDesc").value;
    //Create the parameter string
    var newCategory = { "CName": categoryName, "CDescription": categoryDesc };
    console.log(newCategory)
    var newCategoryString = JSON.stringify(newCategory)
        //Checking for AJAX operation return
    objRequest.onreadystatechange = function() {
            if (objRequest.readyState == 4 && objRequest.status == 200) {
                var result = JSON.parse(objRequest.responseText);
                console.log(result);
                if (result.WasSuccessful == 1) {
                    document.getElementById('result1').innerHTML = "Category added successfully"
                } else {
                    document.getElementById('result1').innerHTML = result.Exception
                }
            }
        }
        //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newCategoryString);
}


function updateCategory() {
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    var requestData = {
        "CID": document.getElementById('cid').value,
        "CDescription": document.getElementById('cdesc').value
    }
    console.log(requestData)
        //Create the parameter string
    var requestDataString = JSON.stringify(requestData)

    //Checking for AJAX operation return
    objRequest.onreadystatechange = function() {
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            var result = JSON.parse(objRequest.responseText);
            console.log(result)
            if (result.WasSuccessful == 1) {
                document.getElementById('result2').innerHTML = "Category updated successfully"
            } else {
                document.getElementById('result2').innerHTML = result.Exception
            }
        }
    }

    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(requestDataString);

}

function deleteCategory() {
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    //Collect Customer data from the web page
    var CustomerID = document.getElementById("custID").value;
    url = url + CustomerID;
    console.log(url);
    //Checking for AJAX operation return
    objRequest.onreadystatechange = function() {
            if (objRequest.readyState == 4 && objRequest.status == 200) {
                var result = JSON.parse(objRequest.responseText);
                if (result.DeleteCategoryResult.WasSuccessful == 1) {
                    document.getElementById('result3').innerHTML = "Category deleted successfully"
                } else {
                    document.getElementById('result3').innerHTML = result.Exception
                }
            }
        }
        //Start AJAX request
    objRequest.open("GET", url, true);
    objRequest.send(null);

}