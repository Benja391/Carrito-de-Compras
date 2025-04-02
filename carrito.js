const app = Vue.createApp({
    data() {
        return {
            products: {
                id: [],
                name: [],
                price: [],
                img: [],
                category: []
            },
            cart: [],
            totalQuantity: 0,
            totalPrice: 0
        };
    },  
    methods: {
        loadProducts() {
            fetch('productos.json')
                .then(response => {
                    console.log('Estado de la respuesta:', response.status);
                    return response.json();
                })
                .then(data => {
                    console.log('Datos de productos cargados:', data);
                    this.products = data.lista.map(product => ({
                        ...product,
                        price: parseFloat(product.price).toLocaleString('es-AR', { style: 'currency', currency: 'ARS',   minimumFractionDigits: 0  })
                    }));
                })
                .catch(error => console.error("Error al cargar los productos:", error));
        },
        addToCart(product) {
            this.cart.push(product);
            this.updateCartTotal();
            console.log('Producto agregado al carrito:', product);
        },
        removeFromCart(index) {
            this.cart.splice(index, 1); 
            this.updateCartTotal();
        },
        updateCartTotal() {
            this.totalQuantity = this.cart.length;
            this.totalPrice = this.cart.reduce((total, product) => total + parseFloat(product.price.replace(/[^\d.,]/g, '').replace(',', '.')), 0);
        },
        calculateTotal() {
            return this.totalPrice.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 3 }).replace(',', '.')
        }
    },
    mounted() {
        this.loadProducts();
    }
});

app.mount('#app');
