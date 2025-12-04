import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Account {
  id: number;
  game: string;
  title: string;
  price: number;
  seller: {
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
    ownershipVerified: boolean;
  };
  level: number;
  rank: string;
  image: string;
}

const mockAccounts: Account[] = [
  {
    id: 1,
    game: 'Valorant',
    title: 'Immortal 3 Account | 20+ Skins',
    price: 15000,
    seller: {
      name: 'ProGamer2024',
      avatar: '/placeholder.svg',
      rating: 4.9,
      verified: true,
      ownershipVerified: true,
    },
    level: 150,
    rank: 'Immortal 3',
    image: '/placeholder.svg',
  },
  {
    id: 2,
    game: 'CS:GO',
    title: 'Global Elite | Knife + Gloves',
    price: 25000,
    seller: {
      name: 'SkinLord',
      avatar: '/placeholder.svg',
      rating: 5.0,
      verified: true,
      ownershipVerified: true,
    },
    level: 40,
    rank: 'Global Elite',
    image: '/placeholder.svg',
  },
  {
    id: 3,
    game: 'League of Legends',
    title: 'Diamond I | 100+ Champions',
    price: 8000,
    seller: {
      name: 'LeagueKing',
      avatar: '/placeholder.svg',
      rating: 4.7,
      verified: true,
      ownershipVerified: false,
    },
    level: 200,
    rank: 'Diamond I',
    image: '/placeholder.svg',
  },
  {
    id: 4,
    game: 'Dota 2',
    title: 'Ancient V | 5000 Hours',
    price: 12000,
    seller: {
      name: 'DotaPro',
      avatar: '/placeholder.svg',
      rating: 4.8,
      verified: true,
      ownershipVerified: true,
    },
    level: 85,
    rank: 'Ancient V',
    image: '/placeholder.svg',
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');

  const games = ['all', 'Valorant', 'CS:GO', 'League of Legends', 'Dota 2'];

  const filteredAccounts = mockAccounts.filter((account) => {
    const matchesSearch = account.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.game.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = selectedGame === 'all' || account.game === selectedGame;
    return matchesSearch && matchesGame;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Gamepad2" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">GameMarket</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Button
                variant={activeTab === 'catalog' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('catalog')}
                className="gap-2"
              >
                <Icon name="Store" size={18} />
                Каталог
              </Button>
              <Button
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('profile')}
                className="gap-2"
              >
                <Icon name="User" size={18} />
                Профиль
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="catalog" className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Каталог аккаунтов</h2>
                  <p className="text-muted-foreground mt-1">
                    Проверенные продавцы и безопасные сделки
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по играм и аккаунтам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {games.map((game) => (
                    <Button
                      key={game}
                      variant={selectedGame === game ? 'default' : 'outline'}
                      onClick={() => setSelectedGame(game)}
                      size="sm"
                    >
                      {game === 'all' ? 'Все игры' : game}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccounts.map((account) => (
                <Card key={account.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-muted">
                    <img
                      src={account.image}
                      alt={account.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-secondary">
                      {account.game}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{account.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="Trophy" size={14} />
                      {account.rank} • Уровень {account.level}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={account.seller.avatar} />
                          <AvatarFallback>{account.seller.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">{account.seller.name}</span>
                            {account.seller.verified && (
                              <Icon name="BadgeCheck" size={14} className="text-accent" />
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={12} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-xs text-muted-foreground">{account.seller.rating}</span>
                          </div>
                        </div>
                      </div>
                      {account.seller.ownershipVerified && (
                        <Badge variant="outline" className="text-accent border-accent gap-1">
                          <Icon name="ShieldCheck" size={12} />
                          Проверен
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <p className="text-2xl font-bold">{account.price.toLocaleString()} ₽</p>
                      </div>
                      <Button size="sm" className="gap-2">
                        <Icon name="ShoppingCart" size={16} />
                        Купить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>PG</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-2xl">ProGamer2024</CardTitle>
                        <Icon name="BadgeCheck" size={24} className="text-accent" />
                      </div>
                      <CardDescription className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                          4.9 рейтинг
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="ShoppingBag" size={14} />
                          24 продажи
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Icon name="Settings" size={16} />
                    Настройки
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Icon name="ShieldCheck" size={18} className="text-accent" />
                        Статус верификации
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Личность подтверждена</span>
                        <Badge variant="outline" className="text-accent border-accent">
                          <Icon name="Check" size={12} />
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Email подтверждён</span>
                        <Badge variant="outline" className="text-accent border-accent">
                          <Icon name="Check" size={12} />
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Телефон подтверждён</span>
                        <Badge variant="outline" className="text-accent border-accent">
                          <Icon name="Check" size={12} />
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Icon name="TrendingUp" size={18} className="text-primary" />
                        Статистика
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Всего продаж</span>
                        <span className="font-semibold">24</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Успешных сделок</span>
                        <span className="font-semibold">23 (95.8%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">На платформе</span>
                        <span className="font-semibold">3 месяца</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="MessageSquare" size={20} />
                    Последние отзывы
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        buyer: 'GamerPro',
                        rating: 5,
                        comment: 'Всё отлично! Аккаунт соответствует описанию, передача прошла быстро.',
                        date: '2 дня назад',
                      },
                      {
                        buyer: 'PlayerOne',
                        rating: 5,
                        comment: 'Надёжный продавец, рекомендую!',
                        date: '1 неделю назад',
                      },
                      {
                        buyer: 'SkinCollector',
                        rating: 4,
                        comment: 'Хороший аккаунт, немного задержка с передачей, но всё решилось.',
                        date: '2 недели назад',
                      },
                    ].map((review, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{review.buyer[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{review.buyer}</p>
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: review.rating }).map((_, i) => (
                                    <Icon
                                      key={i}
                                      name="Star"
                                      size={12}
                                      className="text-yellow-500 fill-yellow-500"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="History" size={20} />
                    История сделок
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        game: 'Valorant',
                        account: 'Immortal 3 Account',
                        price: 15000,
                        date: '15.11.2024',
                        status: 'completed',
                      },
                      {
                        game: 'CS:GO',
                        account: 'Global Elite Account',
                        price: 25000,
                        date: '10.11.2024',
                        status: 'completed',
                      },
                      {
                        game: 'League of Legends',
                        account: 'Diamond I Account',
                        price: 8000,
                        date: '05.11.2024',
                        status: 'completed',
                      },
                    ].map((transaction, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                                <Icon name="Gamepad2" size={20} className="text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{transaction.account}</p>
                                <p className="text-xs text-muted-foreground">{transaction.game}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{transaction.price.toLocaleString()} ₽</p>
                              <p className="text-xs text-muted-foreground">{transaction.date}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
