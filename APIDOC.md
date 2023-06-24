# Mindful Beauty API Documentation
*The Mindful Beauty API allows users to retrieve product data, provide feedback, and manage their shopping cart. This documentation provides details about the API endpoints, request formats, supported parameters, and examples.*

## *all (GET json Example)*
**Request Format:** localhost:8000/all?file=filename

**Returned Data Format**: JSON

**Description:** Retrieves all data stored in a JSON file, specified by a the "file" parameter passed in via URL.

**Supported Parameters** *List any optional/required parameters*
* file (required)
  * a String specifying the name of the JSON file to retrieve data from (without the .json extension)

**Example Request:** *Fill in example request(s)*
```
await fetch('all/?file=cart');
```

**Example Response:**
```json
{
    "product1": {
        "brandName": "Tatcha",
        "itemName": "The Water Cream Oil-Free Pore Minimizing Moisturizer",
        "price": "$70.00",
        "id": "moisturizer",
        "image": {
            "src": "img/moisturizer.png", 
            "alt": "moisturizer photo"
        },
        "description": "An oil-free, anti-aging water cream that releases a burst of skin-improving Japanese nutrients, powerful botanicals, and optimal",
        "filters": [
            "skincare"
        ]

    }, 
    "product2": {
        "brandName": "Tower 28 Beauty",
        "itemName": "ShineOn Lip Jelly Non-Sticky Gloss",
        "price": "$12.00, originally $16.00",
        "id": "lipgloss",
        "image": {
            "src": "img/lipgloss.png", 
            "alt": "lipgloss photo"
        },
        "description": "A bestselling, non-sticky, moisturizing gloss for soft, shiny lips",
        "filters": [
            "sale", "makeup", "lips"
        ]
    }
}
```

**Error Handling:**
res.status(400).send("Error retrieving fileName.");
res.status(500).send("Error retrieving data.");

## *productInfo (GET json Example)*
**Request Format:** localhost:8000/productInfo/?product=productId

**Returned Data Format**: JSON

**Description:** Returns a JSON object containing details about a specific product.

**Supported Parameters** *List any optional/required parameters and defaults*
* product (required)
  * a stringified JSON object containing the information for a specific product

**Example Request:** *Fill in example request(s)*
```
await fetch('productInfo/?product=productId');
```

**Example Response:**
*Replace the {} with the example response*

```json
{
    "product1": {
        "brandName": "Tatcha",
        "itemName": "The Water Cream Oil-Free Pore Minimizing Moisturizer",
        "price": "$70.00",
        "id": "moisturizer",
        "image": {
            "src": "img/moisturizer.png", 
            "alt": "moisturizer photo"
        },
        "description": "An oil-free, anti-aging water cream that releases a burst of skin-improving Japanese nutrients, powerful botanicals, and optimal",
        "filters": [
            "skincare"
        ]
    }
}
```

**Error Handling:**
res.status(400).send("Error retrieving product name.");
res.status(500).send("Error retrieving product info.");



## *filter (GET json Example)*
**Request Format:** localhost:8000/filter?filter=category

**Returned Data Format**: JSON

**Description:** Retrieves all data corresponding to a specified filter by checking the filter list of each item in the JSON file.

**Supported Parameters** 
* filter (required)
  * a String specifying the category to filter by

**Example Request:** *Fill in example request(s)*
```
await fetch('filter/?filter=Toys');
```

**Example Response:**
```json
{
    "product6": {
        "brandName": "Glow Recipe",
        "itemName": "Watermelon Glow Niacinamide Dew Drops Serum",
        "price": "$35.00",
        "id": "serum",
        "image": {
            "src": "img/serum.png", 
            "alt": "serum photo"
        },
        "description": "A breakthrough, multi-use highlighting serum that hydrates and visibly reduces the look of hyperpigmentation for a dewy, reflective glow—without mica, glitter, or gray cast.",
        "filters": [
            "skincare"
        ]
    },
    "product8": {
        "brandName": "Supergoop!",
        "itemName": "100% Mineral Sheerscreen Sunscreen SPF 30",
        "price": "$38.00",
        "id": "sunscreen",
        "image": {
            "src": "img/sunscreen.png", 
            "alt": "sunscreen photo"
        },
        "description": "A totally sheer, weightless, 100 percent–mineral daily sunscreen lotion that provides SPF 30 protection and shields skin from blue light.",
        "filters": [
            "skincare"
        ]
    }
 }
```

**Error Handling:**
res.status(400).send("Error retrieving filters.");
res.status(500).send("Error logging feedback.");



## *feedback (POST Example)*
**Request Format:** localhost:8000/feedback?body=textContent

**Returned Data Format**: Plain text (confirmation message)

**Description:** Writes the text stored in the body parameter of the URL to a feedback text file.

**Supported Parameters** *List any optional/required parameters*
* POST body parameters:
    * body - (required) the text containing user-inputted feedback

**Example Request:** localhost:8000/feedback?body=This%20is%20feedback

**Error Handling:**
res.status(500).send("Error logging your response.");


## *cart (POST Example)*
**Request Format:** localhost:8000/cart?type=addOrRemove&body=productInfo

**Returned Data Format**: Plain text (confirmation message)

**Description:** If method is 'add', appends the product information (JSON string) stored in the body parameter to cart.json. Else, removes the product in the body parameter from the cart.json file.

**Supported Parameters** *List any optional/required parameters*
* POST body parameters:
    * type - (required) 'add' or 'remove', specifies action to take with product
    * body - (required) the text containing user-inputted feedback

**Example Request:** localhost:8000/cart?method=add&body=productId

**Error Handling:**
res.status(400).send("Error retrieving product name.");
res.status(400).send("Error retrieving add or remove type.");
res.status(500).send("Error retrieving cart products.");
res.status(500).send("Error logging car products.");