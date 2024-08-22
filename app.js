document.addEventListener('DOMContentLoaded', function() {
    const cardNumber = document.querySelector('.card-number');
    const cardHolder = document.querySelector('.card-holder');
    const expiryDate = document.querySelector('.expiry-date');
    const bankName = document.querySelector('.bank-name');

    const form = document.getElementById('card-form');
    const cardInputs = Array.from(document.querySelectorAll('#card-form input[id^="card-number-"]'));
    const inputCardHolder = document.getElementById('card-holder');
    const inputExpiryMonth = document.getElementById('expiry-month');
    const inputExpiryYear = document.getElementById('expiry-year');

    const bankPrefixes = {
        "603799": "بانک ملی ایران",
        "589210": "بانک سپه",
        "627381": "بانک انصار",
        "603770": "بانک کشاورزی",
        "628023": "بانک مسکن",
        "627760": "پست بانک ایران",
        "502908": "بانک توسعه تعاون",
        "627412": "بانک اقتصاد نوین",
        "622106": "بانک پارسیان",
        "502229": "بانک پاسارگاد",
        "627488": "بانک کارآفرین",
        "621986": "بانک سامان",
        "639346": "بانک سینا",
        "639607": "بانک سرمایه",
        "636214": "بانک آینده",
        "502806": "بانک شهر",
        "502938": "بانک دی",
        "603769": "بانک صادرات",
        "610433": "بانک ملت",
        "627353": "بانک تجارت",
        "589463": "بانک رفاه"
    };

    function detectBank(cardNumber) {
        for (let prefix in bankPrefixes) {
            if (cardNumber.startsWith(prefix)) {
                return bankPrefixes[prefix];
            }
        }
        return "بانک نامشخص";
    }

    function updateCardNumber() {
        const cardNumberValue = cardInputs.map(input => input.value).join(' ');
        cardNumber.textContent = cardNumberValue || '**** **** **** ****';

        const fullCardNumber = cardNumberValue.replace(/\s/g, '');
        if (fullCardNumber.length >= 6) {
            const detectedBank = detectBank(fullCardNumber);
            bankName.textContent = detectedBank;
        } else {
            bankName.textContent = '';
        }
    }

    function updateExpiryDate() {
        const month = inputExpiryMonth.value.padStart(2, '0');
        const year = inputExpiryYear.value;
        expiryDate.textContent = month && year ? `${month}/${year}` : 'MM/YY';
    }

    
    cardInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            // Delete any character that is not a number
                        this.value = this.value.replace(/\D/g, '');
            
// Update card number display
            updateCardNumber();

// Move focus to the next field if this field is filled            
            if (this.value.length === 4 && index < 3) {
                cardInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', function(e) {
// If the backspace key is pressed and the field is empty, go to the previous field            
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                cardInputs[index - 1].focus();
            }
        });
    });


    inputCardHolder.addEventListener('input', function(e) {
        cardHolder.textContent = e.target.value || 'نام دارنده کارت';
    });

    inputExpiryMonth.addEventListener('input', updateExpiryDate);
    inputExpiryYear.addEventListener('input', updateExpiryDate);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emptyFields = [];

        if (cardInputs.some(input => !input.value)) emptyFields.push('شماره کارت');
        if (!inputCardHolder.value) emptyFields.push('نام دارنده کارت');
        if (!inputExpiryMonth.value) emptyFields.push('ماه انقضا');
        if (!inputExpiryYear.value) emptyFields.push('سال انقضا');

        if (emptyFields.length > 0) {
            alert(`لطفاً فیلدهای زیر را پر کنید: ${emptyFields.join(', ')}`);
        } else {
            alert('اطلاعات کارت با موفقیت ثبت شد!');
        }
    });
});
