/**
 * DRIFTLESS HARVEST CONFIGURATION
 * 
 * This file contains ALL business content, copy, products, and branding.
 * To update prices, products, or copy, edit this file only.
 * 
 * DO NOT edit script.js for content changes.
 */

const CONFIG = {
    
    // ============================================
    // BRAND & IDENTITY
    // ============================================
    
    brand: {
        name: "Driftless Harvest",
        tagline: "Fresh from Viroqua, Wisconsin",
        location: "Viroqua, Wisconsin",
        region: "Driftless Region",
        email: "hello@driftlessharvest.local",
        phone: "(608) 555-0123"
    },
    
    // ============================================
    // NAVIGATION
    // Each view ID must match a key in the 'views' object below
    // ============================================
    
    navigation: [
        { id: "home", label: "Home" },
        { id: "boxes", label: "Food Boxes" },
        { id: "how-it-works", label: "How It Works" },
        { id: "about", label: "About" },
        { id: "checkout", label: "Checkout", hideInNav: true } // Hidden from main nav, accessed via button
    ],
    
    // ============================================
    // VIEWS / PAGES
    // Each view contains content that will be rendered when active
    // ============================================
    
    views: {
        
        home: {
            title: "Welcome to Driftless Harvest",
            hero: {
                heading: "Farm-Fresh Food from Your Neighbors",
                subheading: "Supporting local farms in the Driftless Region of Wisconsin",
                description: "We connect you directly with seasonal produce, meats, and goods from family farms right here in Vernon County. No middlemen. No shipping from thousands of miles away. Just good food from good people.",
                ctaText: "Browse Food Boxes",
                ctaView: "boxes"
            },
            sections: [
                {
                    heading: "Why Driftless Harvest?",
                    content: [
                        "The Driftless Region is one of the most beautiful and fertile areas in the Midwest. Our farms benefit from unique topography that wasn't flattened by glaciers — rolling hills, deep valleys, and rich soil that grows incredible food.",
                        "When you order from Driftless Harvest, you're supporting your neighbors. Every dollar goes directly to local farming families who care for the land and raise food the right way."
                    ]
                },
                {
                    heading: "How It Works",
                    content: [
                        "Choose a food box that fits your household. We offer seasonal boxes packed with whatever is fresh that week — vegetables, fruits, eggs, meat, and pantry staples from farms within 30 miles of Viroqua.",
                        "Pick up your box on Wednesdays or Saturdays at our downtown Viroqua location. It's that simple."
                    ]
                }
            ]
        },
        
        boxes: {
            title: "Our Food Boxes",
            intro: "Each box is packed fresh every week with seasonal produce and goods from local farms. Contents vary based on what's ripe and ready. We'll always let you know what's included before pickup.",
            products: [
                {
                    id: "small-box",
                    name: "Small Household Box",
                    price: 32,
                    description: "Perfect for 1-2 people. A weekly selection of seasonal vegetables, fruits, and farm staples.",
                    seasonality: "Available year-round",
                    typicalContents: [
                        "5-7 varieties of seasonal vegetables",
                        "2-3 types of fruit (when in season)",
                        "1 dozen farm eggs",
                        "Fresh herbs",
                        "Occasional add-ons like honey or preserves"
                    ],
                    availability: "year-round"
                },
                {
                    id: "family-box",
                    name: "Family Box",
                    price: 58,
                    description: "Feeds 3-5 people. A generous weekly harvest including vegetables, fruit, eggs, and your choice of meat or dairy.",
                    seasonality: "Available year-round",
                    typicalContents: [
                        "8-12 varieties of seasonal vegetables",
                        "3-5 types of fruit (when in season)",
                        "1 dozen farm eggs",
                        "Fresh herbs and greens",
                        "1 lb ground beef or pork (or substitute dairy)",
                        "Artisan bread from local bakery"
                    ],
                    availability: "year-round"
                },
                {
                    id: "meat-box",
                    name: "Meat & Staples Box",
                    price: 75,
                    description: "For households that want quality pasture-raised meat. Includes rotating cuts of beef, pork, and chicken plus eggs and seasonal vegetables.",
                    seasonality: "Available year-round",
                    typicalContents: [
                        "2-3 lbs of mixed meat cuts (beef, pork, chicken)",
                        "1 dozen farm eggs",
                        "Seasonal root vegetables and storage crops",
                        "Artisan cheese from local creamery",
                        "Fresh or frozen meat varies by farm availability"
                    ],
                    availability: "year-round"
                },
                {
                    id: "summer-abundance",
                    name: "Summer Abundance Box",
                    price: 45,
                    description: "Peak season celebration! Available June through September when gardens are overflowing.",
                    seasonality: "June - September only",
                    typicalContents: [
                        "10+ varieties of peak-season vegetables",
                        "Fresh berries and stone fruits",
                        "Tomatoes, peppers, cucumbers, squash",
                        "Sweet corn (when available)",
                        "Fresh herbs and edible flowers",
                        "Surprise seasonal treats"
                    ],
                    availability: "seasonal"
                }
            ]
        },
        
        "how-it-works": {
            title: "How It Works",
            intro: "Driftless Harvest is simple. We're not trying to reinvent farming — we're just connecting you directly to the people who grow your food.",
            steps: [
                {
                    number: 1,
                    heading: "Choose Your Box",
                    description: "Browse our selection and pick the food box that fits your household size and eating habits. Not sure? Start with the Small Household Box and adjust from there."
                },
                {
                    number: 2,
                    heading: "We Pack It Fresh",
                    description: "Every week, we work with our partner farms to pack boxes with what's ripe, ready, and in season. You'll get an email on Tuesdays letting you know what's in your box that week."
                },
                {
                    number: 3,
                    heading: "Pick Up in Viroqua",
                    description: "Grab your box on Wednesday or Saturday at Main Street Market in downtown Viroqua. We'll have your name on it. If you can't make it, let us know and we'll hold it for you."
                }
            ],
            faq: [
                {
                    question: "Can I customize what's in my box?",
                    answer: "Not right now — our model depends on giving farmers certainty about what they can harvest each week. But if you have allergies or serious dislikes, let us know and we'll do our best to swap items out."
                },
                {
                    question: "What if I'm out of town?",
                    answer: "No problem. Just email us by Monday and we'll skip your box that week. No charge, no hassle."
                },
                {
                    question: "How do I pay?",
                    answer: "We'll send you an invoice every four weeks. You can pay by check, cash at pickup, or via bank transfer. We're working on adding card payments soon."
                },
                {
                    question: "Where does the food come from?",
                    answer: "Every item comes from farms within 30 miles of Viroqua. We know every farmer personally. Most of them are within 10 miles. This is as local as it gets."
                }
            ]
        },
        
        about: {
            title: "About Driftless Harvest",
            story: [
                "Driftless Harvest started in 2023 when a group of Vernon County farmers realized they were all struggling with the same problem: great food, no good way to sell it locally. Farmers markets are wonderful, but they're weather-dependent and time-intensive. Grocery stores want consistency and volume that small farms can't always provide.",
                "So we built something simpler. A direct line between farms and households. No distribution centers. No contracts with big retailers. Just a weekly rhythm of growing, packing, and delivering food within our own community.",
                "The Driftless Region is special. When glaciers flattened most of the Midwest during the last ice age, they missed this area entirely. The result is a landscape of rolling hills, cold-water trout streams, and some of the richest topsoil anywhere. It's beautiful, and it grows incredible food.",
                "We're not trying to scale this into something huge. We're trying to keep it local, manageable, and good. If you're reading this, you're probably within a short drive of Viroqua. That means we're neighbors. And we'd love to feed you."
            ],
            farms: [
                {
                    name: "Ridgetop Farm",
                    location: "5 miles south of Viroqua",
                    specialty: "Grass-fed beef, pastured pork, seasonal vegetables"
                },
                {
                    name: "Sunrise Valley Gardens",
                    location: "Westby, WI",
                    specialty: "Certified organic vegetables, fresh herbs, cut flowers"
                },
                {
                    name: "Kickapoo Creek Creamery",
                    location: "Soldiers Grove, WI",
                    specialty: "Artisan cheese, grass-fed dairy"
                },
                {
                    name: "Three Sisters Farm",
                    location: "Viroqua, WI",
                    specialty: "Pasture-raised eggs, chicken, seasonal produce"
                }
            ]
        }
        
    },
    
    // ============================================
    // CHECKOUT FLOW
    // Step definitions for the checkout process
    // ============================================
    
    checkout: {
        steps: [
            {
                id: "select",
                title: "Select Your Box",
                description: "Choose the food box that's right for your household"
            },
            {
                id: "contact",
                title: "Your Information",
                description: "We need a few details to process your order"
            },
            {
                id: "review",
                title: "Review & Confirm",
                description: "Double-check everything before you finish"
            },
            {
                id: "confirmation",
                title: "You're All Set",
                description: "We'll be in touch soon"
            }
        ],
        
        // Form field definitions
        contactFields: [
            {
                id: "fullName",
                label: "Full Name",
                type: "text",
                required: true,
                placeholder: "Jane Smith"
            },
            {
                id: "email",
                label: "Email Address",
                type: "email",
                required: true,
                placeholder: "jane@example.com"
            },
            {
                id: "phone",
                label: "Phone Number",
                type: "tel",
                required: true,
                placeholder: "(608) 555-0123"
            },
            {
                id: "pickupDay",
                label: "Preferred Pickup Day",
                type: "select",
                required: true,
                options: [
                    { value: "", label: "Choose a day" },
                    { value: "wednesday", label: "Wednesday" },
                    { value: "saturday", label: "Saturday" }
                ]
            },
            {
                id: "notes",
                label: "Special Requests or Dietary Notes",
                type: "textarea",
                required: false,
                placeholder: "Allergies, dislikes, or anything else we should know"
            }
        ],
        
        // Confirmation message
        confirmationMessage: {
            heading: "Thank You!",
            body: "We've received your order. You'll get an email from us within 24 hours with pickup details and payment information. If you don't see it, check your spam folder or give us a call.",
            nextSteps: [
                "We'll email you Tuesday evening with what's in your first box",
                "Pick up your box on your chosen day at Main Street Market",
                "You'll receive an invoice every four weeks"
            ]
        }
    }
    
};

// Freeze the config object to prevent accidental modification
Object.freeze(CONFIG);