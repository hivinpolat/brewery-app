# Brewery API with JWT Authentication - NestJS

Bu proje, JWT (Json Web Token) kimlik doğrulamasını kullanarak OpenBreweryDB API'sini filtreleyen bir API hizmeti sunan bir web uygulamasıdır. Projede kullanıcı kaydı, oturum açma, JWT oluşturma ve API isteklerinin kimlik doğrulaması gibi temel işlevler bulunmaktadır.

## Kullanılan Teknolojiler

- [NestJS](https://nestjs.com/) - Sunucu tarafı çerçevesi
- [TypeScript](https://www.typescriptlang.org/) - Programlama dili
- [OpenBreweryDB](https://www.openbrewerydb.org/) - Veri kaynağı

## Kurulum ve Çalıştırma

1. Proje klasörüne gidin: `cd brewery-api`
2. Gerekli bağımlılıkları yüklemek için: `npm install`
3. Konfigürasyon dosyasını doldurun: `.env` dosyasına JWT imza anahtarını ekleyin.
4. Projeyi başlatmak için: `npm run start`

## API Endpoints

- `POST /register`: Kullanıcı kaydı yapar. Gövde: `{ "username": "user123", "password": "pass123" }`
- `POST /login`: Kullanıcı oturum açar ve JWT token döner. Gövde: `{ "username": "user123", "password": "pass123" }`
- `GET /breweries`: JWT ile korunan endpoint. Kullanıcı kimlik doğrulaması gereklidir. Arama parametresi: `?query=pale`

## API Dokümantasyonu

API dokümantasyonu ve testi için Swagger kullanılmıştır. Uygulama çalıştığında `http://localhost:3000/docs` adresine giderek belgelere erişebilirsiniz.

## Veritabanı

Projede kullanıcı verileri veritabanında depolanmaktadır. [Veritabanı Teknolojisi] kullanılarak veriler saklanmaktadır. Veritabanı bağlantı ayarlarını `.env` dosyasından yapılandırabilirsiniz.
`.env` dosyasında hivinpolat/postgres@latest image pull edilerek çalıştırılabilir.
docker run --name my-postgres-container -e POSTGRES_PASSWORD=12345 -d -p 5432:5432 postgres
DATABASE_URL=postgresql://postgres:12345@localhost:5432/brewery(`.env` dosyasında)


## Güvenlik

Proje güvenliğe önem vermektedir. Kullanıcı şifreleri hashlenmiş olarak saklanır ve JWT kullanılarak kimlik doğrulaması sağlanır.
`.env` dosyasında JWT_SECRET=your-secret-key tanımlama yapılmalı

## Katkıda Bulunma

1. Bu projeyi "fork"layın.
2. Yeni bir "branch" açın: `git checkout -b yeni-ozellik`
3. Değişiklikleri commit edin: `git commit -m 'Yeni özellik eklendi'`
4. Değişiklikleri "push"layın: `git push origin yeni-ozellik`
5. Bir "pull request" açın.

