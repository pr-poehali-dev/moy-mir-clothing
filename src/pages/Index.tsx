import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  sizes: string[];
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ['Все', 'Женщинам', 'Мужчинам', 'Детям', 'Аксессуары'];

  const products: Product[] = [
    {
      id: 1,
      name: 'Классическая рубашка',
      price: 3990,
      category: 'Женщинам',
      image: 'https://cdn.poehali.dev/projects/c64cb3ab-acd7-4fb6-b6bd-73ca4f555124/files/6e7b24b0-7952-4402-a61c-f3bb02c5704a.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: 'Джинсы прямого кроя',
      price: 4990,
      category: 'Мужчинам',
      image: 'https://cdn.poehali.dev/projects/c64cb3ab-acd7-4fb6-b6bd-73ca4f555124/files/cad77f51-af01-423c-ac14-5885296b3d11.jpg',
      sizes: ['28', '30', '32', '34', '36']
    },
    {
      id: 3,
      name: 'Платье миди',
      price: 5990,
      category: 'Женщинам',
      image: 'https://cdn.poehali.dev/projects/c64cb3ab-acd7-4fb6-b6bd-73ca4f555124/files/2a3aba06-9e91-4114-8e55-c20f308eea6c.jpg',
      sizes: ['XS', 'S', 'M', 'L']
    },
    {
      id: 4,
      name: 'Пуховик зимний',
      price: 12990,
      category: 'Мужчинам',
      image: '/placeholder.svg',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      id: 5,
      name: 'Детская куртка',
      price: 2990,
      category: 'Детям',
      image: '/placeholder.svg',
      sizes: ['110', '116', '122', '128', '134']
    },
    {
      id: 6,
      name: 'Кожаная сумка',
      price: 6990,
      category: 'Аксессуары',
      image: '/placeholder.svg',
      sizes: ['ONE SIZE']
    }
  ];

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product, size: string) => {
    const existingItem = cart.find(item => item.id === product.id && item.selectedSize === size);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id && item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, selectedSize: size }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(cart.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id, size);
    } else {
      setCart(cart.map(item => 
        item.id === id && item.selectedSize === size
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Store" size={28} className="text-primary" />
            <h1 className="text-2xl font-bold">Мой Мир</h1>
          </div>
          
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 p-4 border rounded-lg">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">Размер: {item.selectedSize}</p>
                          <p className="font-semibold mt-1">{item.price.toLocaleString()} ₽</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>
                      </div>
                    ))}
                    <div className="pt-4 border-t space-y-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Итого:</span>
                        <span>{getTotalPrice().toLocaleString()} ₽</span>
                      </div>
                      <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="container text-center">
          <h2 className="text-5xl font-bold mb-4">Мода для всей семьи</h2>
          <p className="text-xl text-muted-foreground mb-8">Качественная одежда на каждый день</p>
          <Button size="lg">
            Смотреть коллекцию
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="flex gap-3 mb-8 flex-wrap justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="transition-all hover:scale-105"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 py-12 mt-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">О нас</h3>
              <p className="text-muted-foreground">Мой Мир — современный магазин одежды для всей семьи</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Контакты</h3>
              <p className="text-muted-foreground">Email: info@moymir.ru</p>
              <p className="text-muted-foreground">Телефон: +7 (495) 123-45-67</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Мы в соцсетях</h3>
              <div className="flex gap-4">
                <Icon name="Instagram" size={24} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Icon name="Facebook" size={24} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Icon name="Twitter" size={24} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <Badge className="absolute top-4 right-4">{product.category}</Badge>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-2xl font-bold mb-4">{product.price.toLocaleString()} ₽</p>
        
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Размер:</p>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSize(size)}
                className="min-w-[50px]"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
        
        <Button 
          className="w-full transition-all"
          onClick={() => onAddToCart(product, selectedSize)}
        >
          <Icon name="ShoppingCart" size={18} className="mr-2" />
          В корзину
        </Button>
      </div>
    </div>
  );
};

export default Index;