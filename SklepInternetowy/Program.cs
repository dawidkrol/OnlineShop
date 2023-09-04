using Microsoft.EntityFrameworkCore;
using OnlineShop.Helpers;
using OnlineShop.Library.Data;
using OnlineShop.Library.Database;
using OnlineShop.Library.Models;
using OnlineShop.Model;
using SklepInternetowy.Library.Models;

IConfiguration configuration = new ConfigurationBuilder()
                            .AddJsonFile("appsettings.json")
                            .Build();

var builder = WebApplication.CreateBuilder(args);

//FirebaseApp.Create(new AppOptions()
//{
//    Credential = GoogleCredential.GetApplicationDefault(),
//});

//builder.Services
//    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.Authority = configuration["Issuer"];
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidIssuer = configuration["Issuer"],
//            ValidateAudience = true,
//            ValidAudience = configuration["Audience"],
//            ValidateLifetime = true
//        };
//    });

builder.Services.AddDbContext<ShopContext>(options =>
                        options.UseSqlServer(configuration.GetConnectionString("ShopDatabase")));


builder.Services.AddAutoMapper(config =>
{
    config.CreateMap<CategoryDbModel, CategoryModel>();
    config.CreateMap<CategoryModel, CategoryDbModel>();

    config.CreateMap<ImageDbModel, ImageModel>();
    config.CreateMap<ImageModel, ImageDbModel>();

    config.CreateMap<ShopItemDbModel, ShopItemModel>();
    config.CreateMap<ShopItemModel, ShopItemDbModel>();

    config.CreateMap<ArticleDbModel, ArticleModel>();
    config.CreateMap<ArticleModel, ArticleDbModel>();
});

builder.Services.AddControllersWithViews();
//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new OpenApiInfo
//    {
//        Title = "Monali",
//        Version = "v1"
//    });
//    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
//    {
//        Name = "Authorization",
//        Type = SecuritySchemeType.ApiKey,
//        Scheme = "Bearer",
//        BearerFormat = "JWT",
//        In = ParameterLocation.Header,
//        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
//    });
//    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
//        {
//            new OpenApiSecurityScheme {
//                Reference = new OpenApiReference {
//                    Type = ReferenceType.SecurityScheme,
//                        Id = "Bearer"
//                }
//            },
//            new string[] {}
//        }
//    });
//});

//Data
builder.Services.AddTransient<IShopItemData, ShopItemData>();
builder.Services.AddTransient<ICategoryData, CategoryData>();
builder.Services.AddTransient<IImageData, ImageData>();
builder.Services.AddTransient<IArticlesData, ArticlesData>();


//Helpers
builder.Services.AddTransient<IShopItemHelper, ShopItemHelper>();
builder.Services.AddTransient<ICategoryHelper, CategoryHelper>();
builder.Services.AddTransient<IArticlesHelper, ArticlesHelper>();

var app = builder.Build();


if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();

//app.UseAuthentication();
//app.UseAuthorization();

app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
