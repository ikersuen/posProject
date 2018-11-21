function calQuantity(allItems, itemBarcode){

  var receiptWithQuantity = [];
  var uniqueItemList = [];
  //find unique item List
  uniqueItemList = allItems.filter(item => itemBarcode.map((x) => x.split("-")[0]).includes(item.barcode));
  //initialize quantity in each object
  uniqueItemList.forEach(item => item.quantity = 0);
  //check quantity in barcode and itemBarcode
  itemBarcode.forEach(function(barcode) {
    if(barcode.includes('-')) {
      uniqueItemList.forEach(function(uniqueItem){
         if(uniqueItem.barcode === barcode.substring(0,10)){
           uniqueItem.quantity += parseInt(barcode.split("-")[1]);
         }else{
           uniqueItem.quantity += 0;
         }
      });
      }else{
        uniqueItemList.forEach(function(uniqueItem){
            uniqueItem.quantity += (uniqueItem.barcode === barcode.substring(0,10)) ? 1 : 0
        });
      }
  });
  receiptWithQuantity = uniqueItemList.slice();
  return receiptWithQuantity;
}
function calUnitPrice(receiptWithQuantity){return receiptWithPrice}

function checkPromotion(receiptWithPrice){return receptwithPromotion}

function getSubtotalPerItem(receiptWithPromotion){return receiptWithSubtotal}

function getTotalPrice(receiptWithSubtotal){return totalPrice}

function createFinalReceipt(receiptWithSubtotal, totalPrice){return receipt}

function printReceipt(allItems, itemBarcode, promotions){return receipt}

function main(){
  var allItems = loadAllItems();
  var promotions = loadPromotions();
  var itemBarcode = loadItemBarcode();
  printReceipt(allItems, itemBarcode, promotions);
}

function loadItemBarcode(){
  return [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2',
  'ITEM000005',
  'ITEM000005',
  'ITEM000005'
  ]
}

function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: 'Coca-Cola',
      unit: 'bottles',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: 'Sprite',
      unit: 'bottles',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: 'Apple',
      unit: 'kg',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: 'Lychee',
      unit: 'kg',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: 'Battery',
      unit: 'unit',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: 'Noodles',
      unit: 'pack',
      price: 4.50
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}

module.exports = {calQuantity, calUnitPrice};
