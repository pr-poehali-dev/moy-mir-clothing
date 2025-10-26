import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все товары');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Все товары',
    'Мебель',
    'Текстиль',
    'Посуда',
    'Декор',
    'Освещение',
    'Хранение',
    'Кухня'
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Диван угловой "Комфорт"',
      price: 45990,
      oldPrice: 52990,
      category: 'Мебель',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
      badge: 'Скидка'
    },
    {
      id: 2,
      name: 'Комплект постельного белья',
      price: 3490,
      category: 'Текстиль',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=500&fit=crop',
      badge: 'Новинка'
    },
    {
      id: 3,
      name: 'Набор тарелок керамических',
      price: 2990,
      category: 'Посуда',
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&h=500&fit=crop'
    },
    {
      id: 4,
      name: 'Ваза декоративная',
      price: 1590,
      category: 'Декор',
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&h=500&fit=crop'
    },
    {
      id: 5,
      name: 'Люстра подвесная',
      price: 8990,
      oldPrice: 11990,
      category: 'Освещение',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop',
      badge: 'Скидка'
    },
    {
      id: 6,
      name: 'Корзина для хранения',
      price: 890,
      category: 'Хранение',
      image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500&h=500&fit=crop'
    },
    {
      id: 7,
      name: 'Кофеварка капельная',
      price: 4990,
      category: 'Кухня',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
      badge: 'Хит'
    },
    {
      id: 8,
      name: 'Стол обеденный',
      price: 19990,
      category: 'Мебель',
      image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500&h=500&fit=crop'
    },
    {
      id: 9,
      name: 'Плед вязаный',
      price: 2490,
      category: 'Текстиль',
      image: 'https://images.unsplash.com/photo-1631049035182-249067d7618e?w=500&h=500&fit=crop',
      badge: 'Новинка'
    },
    {
      id: 10,
      name: 'Сковорода чугунная',
      price: 3290,
      category: 'Кухня',
      image: 'https://images.unsplash.com/photo-1565374472083-c0ce2ec1d07e?w=500&h=500&fit=crop'
    },
    {
      id: 11,
      name: 'Зеркало настенное',
      price: 5990,
      category: 'Декор',
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&h=500&fit=crop'
    },
    {
      id: 12,
      name: 'Настольная лампа',
      price: 2990,
      category: 'Освещение',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Все товары' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <Icon name="Home" className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">МойМир</span>
            </a>
            <nav className="hidden md:flex gap-6">
              <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">
                Каталог
              </a>
              <a href="#delivery" className="text-sm font-medium hover:text-primary transition-colors">
                Доставка
              </a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
                О нас
              </a>
              <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">
                Контакты
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-64">
              <Input
                type="search"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Icon name="ShoppingCart" className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium">Корзина пуста</p>
                      <p className="text-sm text-muted-foreground">Добавьте товары из каталога</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-4 py-4 border-b">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-sm">{item.name}</h3>
                              <p className="text-lg font-bold mt-1">{item.price.toLocaleString()} ₽</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 ml-auto"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Icon name="Trash2" className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4 space-y-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Итого:</span>
                          <span>{getTotalPrice().toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">
              Всё для уютного дома
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Качественная мебель, текстиль и предметы интерьера. Создайте дом своей мечты вместе с МойМир.
            </p>
            <Button size="lg" className="text-lg px-8">
              Смотреть каталог
              <Icon name="ArrowRight" className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Каталог товаров</h2>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="md:hidden mb-6">
            <div className="relative">
              <Input
                type="search"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group border rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-card"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 left-3">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold">{product.price.toLocaleString()} ₽</span>
                    {product.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.oldPrice.toLocaleString()} ₽
                      </span>
                    )}
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => addToCart(product)}
                  >
                    <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                    В корзину
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Package" className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium">Товары не найдены</p>
              <p className="text-sm text-muted-foreground">Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Icon name="Truck" className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-muted-foreground">
                Доставим ваш заказ в течение 1-3 дней по всей России
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Icon name="Shield" className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-muted-foreground">
                Все товары сертифицированы и имеют гарантию
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Icon name="Percent" className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Выгодные цены</h3>
              <p className="text-muted-foreground">
                Регулярные акции и скидки для наших клиентов
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Home" className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">МойМир</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Интернет-магазин товаров для дома и интерьера
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Как сделать заказ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Способы оплаты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Возврат товара</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Вакансии</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Партнёрам</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" className="h-4 w-4" />
                  <a href="tel:+78001234567" className="hover:text-primary transition-colors">
                    8 800 123-45-67
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" className="h-4 w-4" />
                  <a href="mailto:info@moymir.ru" className="hover:text-primary transition-colors">
                    info@moymir.ru
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" className="h-4 w-4" />
                  <span>Москва, ул. Примерная, 1</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 МойМир. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
