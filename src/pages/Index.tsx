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
  rating?: number;
  reviews?: number;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: 'Набор антипригарных сковород "Гранит Делюкс" 3 предмета',
      price: 2990,
      oldPrice: 5990,
      category: 'Кухня',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop',
      badge: 'ХИТ',
      rating: 4.8,
      reviews: 342
    },
    {
      id: 2,
      name: 'Многофункциональная овощерезка 12 в 1',
      price: 1490,
      oldPrice: 2990,
      category: 'Кухня',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop',
      badge: 'СКИДКА -50%',
      rating: 4.9,
      reviews: 521
    },
    {
      id: 3,
      name: 'Ортопедическая подушка с эффектом памяти',
      price: 1990,
      oldPrice: 3990,
      category: 'Для дома',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop',
      badge: 'НОВИНКА',
      rating: 4.7,
      reviews: 189
    },
    {
      id: 4,
      name: 'Беспроводной пылесос "Циклон Про" 2 в 1',
      price: 4990,
      oldPrice: 9990,
      category: 'Техника',
      image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&h=600&fit=crop',
      badge: 'ТОП',
      rating: 4.6,
      reviews: 267
    },
    {
      id: 5,
      name: 'Массажная подушка для шеи и спины',
      price: 2490,
      oldPrice: 4990,
      category: 'Здоровье',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop',
      badge: 'АКЦИЯ',
      rating: 4.8,
      reviews: 412
    },
    {
      id: 6,
      name: 'Умные весы с анализатором состава тела',
      price: 1990,
      category: 'Здоровье',
      image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&h=600&fit=crop',
      rating: 4.5,
      reviews: 156
    },
    {
      id: 7,
      name: 'Электрическая сушилка для обуви',
      price: 890,
      oldPrice: 1790,
      category: 'Для дома',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      badge: 'SALE',
      rating: 4.4,
      reviews: 98
    },
    {
      id: 8,
      name: 'Портативная Bluetooth колонка водонепроницаемая',
      price: 1290,
      oldPrice: 2590,
      category: 'Техника',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
      badge: 'ХИТ',
      rating: 4.7,
      reviews: 234
    }
  ];

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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:88001234567" className="flex items-center gap-2 hover:opacity-80">
              <Icon name="Phone" className="h-4 w-4" />
              <span className="font-semibold">8 800 123-45-67</span>
              <span className="opacity-90">Звонок бесплатный</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>🎁 Бесплатная доставка от 3000 ₽</span>
            <span>⚡ Скидки до 70%</span>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl">
                М
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">МойМир</div>
                <div className="text-xs text-gray-500">Интернет-магазин</div>
              </div>
            </a>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Поиск товаров..."
                  className="pl-10 h-12 text-base"
                />
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button size="lg" className="relative bg-orange-500 hover:bg-orange-600">
                    <Icon name="ShoppingCart" className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Корзина</span>
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 border-white">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="text-2xl">Ваша корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col gap-4">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Icon name="ShoppingCart" className="h-20 w-20 text-gray-300 mb-4" />
                        <p className="text-xl font-semibold text-gray-700">Корзина пуста</p>
                        <p className="text-gray-500 mt-2">Добавьте товары из каталога</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-auto space-y-4">
                          {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold text-sm mb-2">{item.name}</h3>
                                <div className="flex items-baseline gap-2 mb-3">
                                  <span className="text-xl font-bold text-orange-600">{item.price.toLocaleString()} ₽</span>
                                  {item.oldPrice && (
                                    <span className="text-sm text-gray-400 line-through">
                                      {item.oldPrice.toLocaleString()} ₽
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" className="h-4 w-4" />
                                  </Button>
                                  <span className="w-10 text-center font-semibold">{item.quantity}</span>
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
                                    className="h-8 w-8 ml-auto text-red-500 hover:text-red-700 hover:bg-red-50"
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
                          <div className="flex justify-between items-center text-2xl font-bold">
                            <span>Итого:</span>
                            <span className="text-orange-600">{getTotalPrice().toLocaleString()} ₽</span>
                          </div>
                          <Button size="lg" className="w-full text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
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
        </div>
      </header>

      <div className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 py-16">
        <div className="container">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
              Товары для дома со скидкой до 70%!
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow">
              Качественные товары для кухни, дома и здоровья. Доставка по всей России!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto font-bold shadow-xl">
                Смотреть каталог
                <Icon name="ChevronRight" className="ml-2 h-6 w-6" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8 py-6 h-auto font-bold">
                <Icon name="Phone" className="mr-2 h-5 w-5" />
                Позвонить
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-4xl font-extrabold text-center mb-2">
            🔥 Хиты продаж
          </h2>
          <p className="text-center text-gray-600 text-lg mb-10">Самые популярные товары этого месяца</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-orange-300 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm px-3 py-1 shadow-lg z-10">
                      {product.badge}
                    </Badge>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base mb-3 line-clamp-2 min-h-[3rem]">
                    {product.name}
                  </h3>
                  
                  {product.rating && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating!)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  )}

                  <div className="mb-4">
                    {product.oldPrice && (
                      <div className="text-sm text-gray-400 line-through mb-1">
                        {product.oldPrice.toLocaleString()} ₽
                      </div>
                    )}
                    <div className="text-3xl font-extrabold text-orange-600">
                      {product.price.toLocaleString()} ₽
                    </div>
                    {product.oldPrice && (
                      <div className="text-sm font-semibold text-green-600 mt-1">
                        Экономия {(product.oldPrice - product.price).toLocaleString()} ₽
                      </div>
                    )}
                  </div>
                  
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 text-base shadow-lg"
                    onClick={() => addToCart(product)}
                  >
                    <Icon name="ShoppingCart" className="mr-2 h-5 w-5" />
                    Купить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container">
          <h2 className="text-4xl font-extrabold text-center mb-10">Почему выбирают нас?</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставим за 1-3 дня по всей России</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ShieldCheck" className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% гарантия</h3>
              <p className="text-gray-600">Вернём деньги, если не понравится</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="BadgePercent" className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Акции и скидки</h3>
              <p className="text-gray-600">Скидки до 70% на хиты продаж</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Headphones" className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Поддержка 24/7</h3>
              <p className="text-gray-600">Ответим на любые вопросы</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                  М
                </div>
                <span className="text-xl font-bold">МойМир</span>
              </div>
              <p className="text-gray-400 text-sm">
                Интернет-магазин качественных товаров для дома, кухни и здоровья
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Покупателям</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Как оформить заказ</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Оплата и доставка</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Возврат товара</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Гарантия</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Отзывы</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Вакансии</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Контакты</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" className="h-4 w-4 text-orange-400" />
                  <a href="tel:88001234567" className="hover:text-orange-400 transition-colors font-semibold">
                    8 800 123-45-67
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" className="h-4 w-4 text-orange-400" />
                  <a href="mailto:info@moymir.ru" className="hover:text-orange-400 transition-colors">
                    info@moymir.ru
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="MapPin" className="h-4 w-4 text-orange-400 mt-1" />
                  <span>Россия, Москва<br/>Ленинский проспект, 1</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>© 2024 МойМир. Интернет-магазин товаров для дома. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
