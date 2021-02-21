var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        selectedVariant: 0,
        variants: [
            {
                id: 2234,
                color: "green",
                image: './assets/sock_green.jpg',
                quantity: 10
            },
            {
                id: 2235,
                color: "blue",
                image: './assets/sock_blue.jpg',
                quantity: 0
            }
        ],
        cart: 0
    },
    methods: {
        addToCart: function () {
            this.cart += 1;
        },
        updateSelected: function (index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title: function () {
            return this.brand + ' ' + this.product;
        },
        image: function () {
            return this.variants[this.selectedVariant].image;
        },
        inventory: function () {
            return this.variants[this.selectedVariant].quantity;
        }
    }
});