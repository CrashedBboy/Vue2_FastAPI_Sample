Vue.component('product-review', {
    template: `
        <form class='review-form' @submit.prevent="onSubmit">
            <div v-if="errors.length > 0">
                <p>Please correct the following errors:</p>
                <ul>
                    <li v-for="e in errors">{{ e }}</li>
                </ul>
            </div>
            <p>
                <label for="name">Name:</label>
                <input id="name" type='text' v-model="name" placeholder="name"/>
            </p>
            <p>
                <label for="review">Review:</label>
                <textarea id="review" type='text' v-model="review"></textarea>
            </p>
            <p>
                <input type="submit" value="Submit"/>
            </p>
        </form>
    `,
    data: function () {
        return {
            name: null,
            review: null,
            errors: []
        };
    },
    methods: {
        onSubmit: function () {
            this.errors = [];
            
            if (this.name && this.review) {
                let r = {
                    name: this.name,
                    review: this.review
                }
                this.$emit('review-submitted', r);
                this.name = null;
                this.review = null;
            } else {

                if (!this.name) {
                    this.errors.push('Name is empty');
                }

                if (!this.review) {
                    this.errors.push('Review is empty');
                }
            }
        }
    }
})


Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img v-bind:src="image" />
            </div>

            <div class="product-info">

                <h1>{{ title }}</h1>

                <div class="quantity-status">
                    <p v-if="inventory > 10">In Stock</p>
                    <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
                    <p v-else :class="{outOfStock: true}">Out of Stock</p>
                </div>
                
                <p>Shipping: {{ shipping }}</p>

                <ul>
                    <li v-for="d in details">{{ d }}</li>
                </ul>

                <div class="variant-box">
                    <p>Color:</p>
                    <div v-for="(v, index) in variants" :key="v.id"
                        class="color-box" :style="{ backgroundColor: v.color }"
                        @mouseover="updateSelected(index)">
                    </div>
                </div>
                

                <button v-on:click="addToCart"
                        :disabled="inventory <= 0"
                        :class="{disabledButton: inventory <= 0}">Add to Cart</button>
            </div>

            <div class="review-box">
                <h2>Reviews</h2>
                <p v-if="reviews.length == 0">There are no reviews yet.</p>
                <ul>
                    <li v-for="r in reviews">
                        <p>{{r.name}}: {{r.review}}</p>
                    </li>
                </ul>
            </div>

            <product-review @review-submitted="addReview"></product-review>
        </div>
    `,
    data: function () {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            selectedVariant: 0,
            variants: [
                {
                    id: 2234,
                    color: "green",
                    image: './assets/sock_green.jpg',
                    quantity: 12
                },
                {
                    id: 2235,
                    color: "blue",
                    image: './assets/sock_blue.jpg',
                    quantity: 0
                }
            ],
            reviews: []
        };
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        updateSelected: function (index) {
            this.selectedVariant = index;
        },
        addReview: function (review) {
            this.reviews.push(review);
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
        },
        shipping: function () {
            if (this.premium) {
                return 'Free';
            } else {
                return 2.99;
            }
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
        cartUpdating: false
    },
    methods: {
        updateCart: function (productId) {
            this.cart.push(productId);

            this.cartUpdating = true;
            let that = this;
            setTimeout(() => { that.cartUpdating = false; }, 400);
        }
    }
});