const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testData:
        {
            "username": "prince.gupta@gmail.com",
            "password": "Prince@123",
            "desiredProd": "iphone 13 pro"
        }
    }
)
