QUnit.test("CalcCoins test", function(assert) {
  assert.deepEqual(CalcCoins("£12"), [6, 0, 0, 0, 0, 0, 0, 0]);
  assert.deepEqual(CalcCoins("123p"), [0, 1, 0, 1, 0, 0, 1, 1]);
  assert.deepEqual(CalcCoins("432"), [2, 0, 0, 1, 1, 0, 1, 0]);
  assert.deepEqual(CalcCoins("213p"), [1, 0, 0, 0, 1, 0, 1, 1]);
  assert.deepEqual(CalcCoins("£16.23p"), [8, 0, 0, 1, 0, 0, 1, 1]);
  assert.deepEqual(CalcCoins("£14"), [7, 0, 0, 0, 0, 0, 0, 0]);
  assert.deepEqual(CalcCoins("£54.04"), [27, 0, 0, 0, 0, 0, 2, 0]);
  assert.deepEqual(CalcCoins("£23.33333"), [11, 1, 0, 1, 1, 0, 1, 1]);
  assert.deepEqual(CalcCoins("001.41p"), [0, 1, 0, 2, 0, 0, 0, 1]);
  assert.deepEqual(CalcCoins("13x"), null);
  assert.deepEqual(CalcCoins("13p.02"), null);
  assert.deepEqual(CalcCoins("£p"), null);
});

QUnit.test("Convert To Pennies test", function(assert) {
  assert.equal(convertToPennies("£12.34"), 1234);
  assert.equal(convertToPennies("123p"), 123);
  assert.equal(convertToPennies("432"), 432);
  assert.equal(convertToPennies("213p"), 213);
  assert.equal(convertToPennies("£16.23p"), 1623);
  assert.equal(convertToPennies("£14"), 1400);
  assert.equal(convertToPennies("£54.04"), 5404);
  assert.equal(convertToPennies("£23.33333"), 2333);
  assert.equal(convertToPennies("001.41p"), 141);
  assert.equal(convertToPennies("13x"), -1);
  assert.equal(convertToPennies("13p.02"), -1);
  assert.equal(convertToPennies("£p"), -1);
});

QUnit.test("Clean Amount Text test", function(assert) {
  assert.equal(cleanAmountText("£12.34"), "12.34");
  assert.equal(cleanAmountText("123p"), "123");
  assert.equal(cleanAmountText("432"), "432");
  assert.equal(cleanAmountText("213p"), "213");
  assert.equal(cleanAmountText("£16.23p"), "16.23");
  assert.equal(cleanAmountText("£14"), "14");
  assert.equal(cleanAmountText("£54.04"), "54.04");
  assert.equal(cleanAmountText("£23.33333"), "23.33333");
  assert.equal(cleanAmountText("001.41p"), "001.41");
  assert.equal(cleanAmountText("13x"), -1);
  assert.equal(cleanAmountText("13p.02"), -1);
  assert.equal(cleanAmountText("£p"), -1);
});

QUnit.test("Is Valid Input test", function(assert) {
  assert.equal(isValidInput("£12.34"), true);
  assert.equal(isValidInput("123p"), true);
  assert.equal(isValidInput("432"), true);
  assert.equal(isValidInput("213p"), true);
  assert.equal(isValidInput("£16.23p"), true);
  assert.equal(isValidInput("£14"), true);
  assert.equal(isValidInput("£54.04"), true);
  assert.equal(isValidInput("£23.33333"), true);
  assert.equal(isValidInput("001.41p"), true);
  assert.equal(isValidInput("13x"), false);
  assert.equal(isValidInput("13p.02"), false);
  assert.equal(isValidInput("£p"), false);
});
