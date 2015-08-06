"use strict"
//adapter
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!indexedDB) {
    alert("your browser not Support indexedDB");
}

//simple indexedDB lib

//Arr init
var dataArr = {};
dataArr.Contact = [];
dataArr.Record = [];

//indexedDB setting
//index.length === unique.length
var IDBSetting = {
    name: "indexedDBName",
    version: 1,
    tables: [{
        tableName: "Record",
        keyPath: "seq",
        autoIncrement: true,
        index: ["date", "time", "name", "phone_no", "condition", "content", "id", "csmid", "img_path", "sms_condition"],
        unique: [false, false, false, false, false, false, false, false, false, false]
    }, {
        tableName: "Contact",
        keyPath: "phone_no",
        autoIncrement: false,
        index: ["name", "id"],
        unique: [false, false]
    }]
};

! function() {
    console.log("indexeDB init");

    var req = indexedDB.open(IDBSetting.name, IDBSetting.version);

    req.onsuccess = function(event) {
        console.log("indexedDB open success");
    };

    req.onerror = function(event) {
        console.log("indexed DB open fail");
    };

    //callback run init or versionUp
    req.onupgradeneeded = function(event) {
        console.log("init onupgradeneeded indexedDB ");
        var db = event.target.result;

        for (var i in IDBSetting.tables) {
            var OS = db.createObjectStore(IDBSetting.tables[i].tableName, {
                keyPath: IDBSetting.tables[i].keyPath,
                autoIncrement: IDBSetting.tables[i].autoIncrement
            });

            for (var j in IDBSetting.tables[i].index) {
                OS.createIndex(IDBSetting.tables[i].index[j], IDBSetting.tables[i].index[j], {
                    unique: IDBSetting.tables[i].unique[j]
                });
            }
        }
    }
}();

//IDBFuncSet index
//addData: function(tableName, data)
//putData: function(tableName, data)

//[info]Put the data in the dataObject or arr
//getKeyData: function(dataObject, tableName, key)
//getIndexData: function(dataObject, tableName, indexed, searchData)
//tableLowCounter: function(countObject, tableName)
//getAllData: function(arr, tableName)

//deleteData: function(tableName, key)
//allDeleteData: function(tableName)
//deleteDatabase: function(indexedDBName)

var IDBFuncSet = {
    //write
    addData: function(table, data) {
        var req = indexedDB.open(IDBSetting.name, IDBSetting.version);

        req.onsuccess = function(event) {
            try {
                console.log("addData indexedDB open success");
                var db = req.result;
                var transaction = db.transaction([table], "readwrite");
                var objectStore = transaction.objectStore(table);
                var objectStoreRequest = objectStore.add(data);
            } catch (e) {
                console.log("addDataFunction table or data null error");
                console.log(e);
            }

            objectStoreRequest.onsuccess = function(event) {
                //console.log("Call data Insert success");
            }
            objectStoreRequest.onerror = function(event) {
                console.log("addData error");
            }
        };

        req.onerror = function(event) {
            console.log("addData indexed DB open fail");
        };
    },

    putData: function(table, data) {
        var req = indexedDB.open(IDBSetting.name, IDBSetting.version);

        req.onsuccess = function(event) {
            console.log("putData indexedDB open success");
            try {
                var db = req.result;
                var transaction = db.transaction([table], "readwrite");
                var objectStore = transaction.objectStore(table);
                var objectStoreRequest = objectStore.put(data);
                //console.log(data);
            } catch (e) {
                console.log("putData table or data null error");
                console.log(e);
            }
            objectStoreRequest.onsuccess = function(event) {
                console.log("putData Insert success");
            }
            objectStoreRequest.onerror = function(event) {
                console.log("putData error");
            }
        };

        req.onerror = function(event) {
            console.log("putData indexed DB open fail");
        };
    },

    getKeyData: function(dataObject, table, key) {

        var req = indexedDB.open(IDBSetting.name, IDBSetting.version);

        req.onsuccess = function(event) {
            console.log("getData indexedDB open success");
            try {
                var db = req.result;
                var transaction = db.transaction([table], "readwrite");
                var objectStore = transaction.objectStore(table);
                var objectStoreRequest = objectStore.get(key);
            } catch (e) {
                console.log("getKeyData function error");
                console.log(e);
            }

            objectStoreRequest.onsuccess = function(event) {
                dataObject = objectStoreRequest.result;

            }
            objectStoreRequest.onerror = function(event) {
                console.log("getData error");
            }
        }
    },

    getIndexData: function(dataObject, table, indexed, searchData) {

        var req = indexedDB.open(IDBSetting.name, IDBSetting.version);

        req.onsuccess = function(event) {
            console.log("getData indexedDB open success");
            try {
                var db = req.result;
                var transaction = db.transaction([table], "readonly");
                var objectStore = transaction.objectStore(table);
                var objectStoreRequest = objectStore.index(indexed);
            } catch (e) {
                console.log("getIndexData table or indexed or searchData null error");
                console.log(e);
            }

            objectStoreRequest.get(searchData).onsuccess = function(event) {
                dataObject = event.target.result;
            };
        }
    },

    tableLowCounter: function(countObject, table) {

        var req = indexedDB.open(IDBSetting.name, IDBSetting.version);

        req.onsuccess = function(event) {
            try {
                var db = req.result;
                var transaction = db.transaction([table], "readonly");
                var objectStore = transaction.objectStore(table);

                var objectStoreRequest = objectStore.count();
            } catch (e) {
                console.log("indexedDBcounter table null error");
                console.log(e);
            }

            objectStoreRequest.onsuccess = function(event) {
                countObject = event.target.result;
            }
        }
    },

    getAllData: function(arr, table) {
        try {
            var req = indexedDB.open(IDBSetting.name, IDBSetting.version);

            req.onsuccess = function(event) {
                var db = req.result;
                var transaction = db.transaction([table], "readonly");
                var objectStore = transaction.objectStore(table);

                var objectStoreRequest = objectStore.openCursor();

                objectStoreRequest.onsuccess = function(event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        arr.push(cursor.value);
                        cursor.continue();
                    } else {
                        console.log("getAllData call success");
                        console.log(arr);
                    }
                }
            };
            req.onerror = function(event) {
                console.log("getAllData indexed DB open fail");
            };
        } catch (e) {
            console.log("getDataLowerBoundCursor arr or table or lowerBoundNum null error");
            console.log(e);
        }
    },

    deleteData: function(table, key) {
        try {

            var req = indexedDB.open(IDBSetting.name, IDBSetting.version);

            req.onsuccess = function(event) {
                console.log("dataAllDelete indexedDB open success");
                var db = req.result;
                var transaction = db.transaction([table], "readwrite");
                var objectStore = transaction.objectStore(table);
                var objectStoreRequest = objectStore.delete(key);

                transaction.oncomplete = function(event) {
                    console.log("dataAllDelete transaction oncomplete");
                };

                objectStoreRequest.onsuccess = function(event) {
                    console.log("Call data Insert success");
                }
            };

            req.onerror = function(event) {
                console.log("dataAllDelete indexed DB open fail");
            };
        } catch (e) {
            console.log("deleteData function table or key null error");
            console.log(e);
        }

    },
    allDeleteData: function(table) {
        try {
            var req = indexedDB.open(IDBSetting.name, IDBSetting.version);

            req.onsuccess = function(event) {
                console.log("dataAllDelete indexedDB open success");
                var db = req.result;
                var transaction = db.transaction([table], "readwrite");
                var objectStore = transaction.objectStore(table);
                var objectStoreRequest = objectStore.clear();

                transaction.oncomplete = function(event) {
                    console.log("dataAllDelete transaction oncomplete");
                };

                objectStoreRequest.onsuccess = function(event) {
                    console.log(table + " : Call data claer success");
                }
            };

            req.onerror = function(event) {
                console.log("dataAllDelete indexed DB open fail");
            };
        } catch (e) {
            console.log("allDeleteData function error");
            console.log(e);
        }
    },
    deleteDatabase: function(indexedDBName) {
        try {
            console.log("deleteDatabase call indexedDBName : " + indexedDBName);
            var DBDeleteRequest = window.indexedDB.deleteDatabase(indexedDBName);

            DBDeleteRequest.onerror = function(event) {
                console.log("Error deleting database.");
            };

            DBDeleteRequest.onsuccess = function(event) {
                console.log("Database deleted successfully");
            };
        } catch (e) {
            console.log("deleteDatabase error");
            console.log(e);
        }
    }
}


//test code

IDBFuncSet.addData("Record", {
    sms_condition : 1,
    time : "nowtime",
    img_Path : "./img",
    id : "jkh",
    date: "nowDate",
    name : "jung",
    phone_no : "010-4545-3121",
    condition : "1",
    csmid : "csmid",
    content : "text content"
})

IDBFuncSet.addData("Contact", {
    phone_no : "010-0000-0000",
	name : "sujkh85"
	id : "jkh"
})


IDBFuncSet.getAllData(dataArr.Record , "Record");
IDBFuncSet.getAllData(dataArr.Contact , "Contact");



