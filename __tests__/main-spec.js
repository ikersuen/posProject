var printReceipt = require('../main');

it ('calQuantity', () => {

  let expected = [
    {
      'barcode': 'ITEM000001',
      'name': 'Sprite',
      'unit': 'bottles',
      'price': 3.00,
      'quantity': 5.00
    },
    { 'barcode': 'ITEM000003',
      'name': 'Lychee',
      'unit': 'kg',
      'price': 15.00,
      'quantity': 2.00
    },
    { 'barcode': 'ITEM000005',
      'name': 'Noodles',
      'unit': 'pack',
      'price': 4.50,
      'quantity': 3.00
    }
  ];

	expect(printReceipt.calQuantity(loadAllItems(), loadItemBarcode())).toEqual(expected);
});

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
