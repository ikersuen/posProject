var printReceipt = require('../main');

it ('calQuantity', () => {

  let expected = [
    {
      'barcode': 'ITEM000001',
      'name': 'Sprite',
      'unit': 'bottle',
      'price': 3.00,
      'quantity': 5.00
    },
    { 'barcode': 'ITEM000003',
      'name': 'Litchi',
      'unit': 'kg',
      'price': 15.00,
      'quantity': 2.00
    },
    { 'barcode': 'ITEM000005',
      'name': 'Noodles',
      'unit': 'bag',
      'price': 4.50,
      'quantity': 3.00
    }
  ];

	expect(printReceipt.calQuantity(loadAllItems(), loadItemBarcode())).toEqual(expected);
});

it ('checkPromotion', () => {
  let expected = [ { barcode: 'ITEM000001',
    name: 'Sprite',
    unit: 'bottle',
    price: 3,
    quantity: 5,
    promotionType: 'BUY_TWO_GET_ONE_FREE' },
  { barcode: 'ITEM000003',
    name: 'Litchi',
    unit: 'kg',
    price: 15,
    quantity: 2,
    promotionType: 'NULL' },
  { barcode: 'ITEM000005',
    name: 'Noodles',
    unit: 'bag',
    price: 4.5,
    quantity: 3,
    promotionType: 'BUY_TWO_GET_ONE_FREE' }
  ];
    expect(printReceipt.checkPromotion(printReceipt.calQuantity(loadAllItems(), loadItemBarcode()),loadPromotions())).toEqual(expected);
});

it ('getSubtotalPerItem', () => {
  let receiptWithPromotion = printReceipt.checkPromotion(printReceipt.calQuantity(loadAllItems(), loadItemBarcode()),loadPromotions());
  let expected = [ { barcode: 'ITEM000001',
    name: 'Sprite',
    unit: 'bottle',
    price: 3,
    quantity: 5,
    promotionType: 'BUY_TWO_GET_ONE_FREE',
    subtotal: 12 },
  { barcode: 'ITEM000003',
    name: 'Litchi',
    unit: 'kg',
    price: 15,
    quantity: 2,
    promotionType: 'NULL',
    subtotal: 30 },
  { barcode: 'ITEM000005',
    name: 'Noodles',
    unit: 'bag',
    price: 4.5,
    quantity: 3,
    promotionType: 'BUY_TWO_GET_ONE_FREE',
    subtotal: 9 }
  ]
    expect(printReceipt.getSubtotalPerItem(receiptWithPromotion)).toEqual(expected);
});

it ('getTotalPrice', () => {
  let receiptWithPromotion = printReceipt.checkPromotion(printReceipt.calQuantity(loadAllItems(), loadItemBarcode()),loadPromotions());

  let receiptWithSubtotal = printReceipt.getSubtotalPerItem(receiptWithPromotion);

  expect(printReceipt.getTotalPrice(receiptWithSubtotal)).toBe(51);


});

it ('createFinalReceipt', () => {
  let receiptWithPromotion = printReceipt.checkPromotion(printReceipt.calQuantity(loadAllItems(), loadItemBarcode()),loadPromotions());

  let receiptWithSubtotal = printReceipt.getSubtotalPerItem(receiptWithPromotion);

  let expected =
`***<store earning no money>Receipt ***
Name: Sprite, Quantity: 5 bottle, Unit price: 3.00 (yuan), Subtotal: 12.00 (yuan)
Name: Litchi, Quantity: 2 kg, Unit price: 15.00 (yuan), Subtotal: 30.00 (yuan)
Name: Noodles, Quantity: 3 bag, Unit price: 4.50 (yuan), Subtotal: 9.00 (yuan)
----------------------
Total: 51.00 (yuan)
Saving: 7.50 (yuan)
**********************`

  expect(printReceipt.createFinalReceipt(receiptWithSubtotal,printReceipt.getTotalPrice(receiptWithSubtotal))).toEqual(expected);


});

describe('pos', () => {

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    const expectText = `***<store earning no money>Receipt ***
Name: Sprite, Quantity: 5 bottle, Unit price: 3.00 (yuan), Subtotal: 12.00 (yuan)
Name: Litchi, Quantity: 2.5 kg, Unit price: 15.00 (yuan), Subtotal: 37.50 (yuan)
Name: Noodles, Quantity: 3 bag, Unit price: 4.50 (yuan), Subtotal: 9.00 (yuan)
----------------------
Total: 58.50 (yuan)
Saving: 7.50 (yuan)
**********************`;

    expect(printReceipt.printReceipt(loadAllItems(), tags, loadPromotions())).toEqual(expectText);
  });
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
      unit: 'bottle',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: 'Sprite',
      unit: 'bottle',
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
      name: 'Litchi',
      unit: 'kg',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: 'Battery',
      unit: 'box',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: 'Noodles',
      unit: 'bag',
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
