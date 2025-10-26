import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: 'courier' | 'pickup';
  paymentMethod: 'card' | 'cash';
  comments: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    comments: ''
  });

  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Введите имя';
    if (!formData.lastName.trim()) newErrors.lastName = 'Введите фамилию';
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (!/^\+?[0-9]{10,}$/.test(formData.phone.replace(/[\s()-]/g, ''))) {
      newErrors.phone = 'Неверный формат телефона';
    }

    if (formData.deliveryMethod === 'courier') {
      if (!formData.address.trim()) newErrors.address = 'Введите адрес';
      if (!formData.city.trim()) newErrors.city = 'Введите город';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Введите индекс';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Заказ оформлен! Мы свяжемся с вами в ближайшее время.');
      navigate('/');
    }
  };

  const orderItems = [
    { id: 1, name: 'Классическая рубашка', size: 'M', quantity: 1, price: 3990 },
    { id: 2, name: 'Джинсы прямого кроя', size: '32', quantity: 1, price: 4990 }
  ];

  const deliveryCost = formData.deliveryMethod === 'courier' ? 500 : 0;
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryCost;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад в магазин
          </Button>
        </div>
      </header>

      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="User" size={20} />
                    Контактные данные
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Truck" size={20} />
                    Способ доставки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={formData.deliveryMethod}
                    onValueChange={(value) => handleInputChange('deliveryMethod', value)}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="courier" id="courier" />
                      <Label htmlFor="courier" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">Курьерская доставка</p>
                            <p className="text-sm text-muted-foreground">Доставка по Москве и области</p>
                          </div>
                          <span className="font-semibold">500 ₽</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">Самовывоз</p>
                            <p className="text-sm text-muted-foreground">Из магазина на Тверской, 10</p>
                          </div>
                          <span className="font-semibold">Бесплатно</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.deliveryMethod === 'courier' && (
                    <div className="space-y-4 pt-4 border-t">
                      <div>
                        <Label htmlFor="city">Город *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={errors.city ? 'border-red-500' : ''}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Label htmlFor="address">Адрес доставки *</Label>
                        <Input
                          id="address"
                          placeholder="Улица, дом, квартира"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className={errors.address ? 'border-red-500' : ''}
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Почтовый индекс *</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          className={errors.postalCode ? 'border-red-500' : ''}
                        />
                        {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CreditCard" size={20} />
                    Способ оплаты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleInputChange('paymentMethod', value)}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <p className="font-semibold">Банковской картой онлайн</p>
                        <p className="text-sm text-muted-foreground">Visa, MasterCard, МИР</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        <p className="font-semibold">Наличными при получении</p>
                        <p className="text-sm text-muted-foreground">Оплата курьеру или в магазине</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MessageSquare" size={20} />
                    Комментарий к заказу
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Укажите особые пожелания или уточнения по заказу"
                    value={formData.comments}
                    onChange={(e) => handleInputChange('comments', e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>
            </form>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Размер: {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">{(item.price * item.quantity).toLocaleString()} ₽</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Товары:</span>
                    <span>{subtotal.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка:</span>
                    <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span>{total.toLocaleString()} ₽</span>
                </div>

                <Button type="submit" className="w-full" size="lg" onClick={handleSubmit}>
                  Оформить заказ
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
