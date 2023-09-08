using FirebaseAdmin;
using Google;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OnlineShop.Helpers;
using OnlineShop.Library.Data;
using OnlineShop.Library.Database;
using OnlineShop.Library.Models;
using OnlineShop.Model;
using OnlineShop.Models;
using SklepInternetowy.Library.Models;

IConfiguration configuration = new ConfigurationBuilder()
                            .AddJsonFile("appsettings.json")
                            .Build();

var builder = WebApplication.CreateBuilder(args);

//FirebaseApp.Create();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = configuration["Issuer"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = configuration["Issuer"],
            ValidateAudience = true,
            ValidAudience = configuration["Audience"],
            ValidateLifetime = true
        };
    });

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

    config.CreateMap<ContactItemTemplateDbModel, ContactItemTemplateModel>();
    config.CreateMap<ContactItemTemplateModel, ContactItemTemplateDbModel>();
});

builder.Services.AddControllersWithViews();

//Data
builder.Services.AddScoped<IShopItemData, ShopItemData>();
builder.Services.AddScoped<ICategoryData, CategoryData>();
builder.Services.AddScoped<IImageData, ImageData>();
builder.Services.AddScoped<IArticlesData, ArticlesData>();
builder.Services.AddScoped<IContactData, ContactData>();


//Helpers
builder.Services.AddTransient<IShopItemHelper, ShopItemHelper>();
builder.Services.AddTransient<ICategoryHelper, CategoryHelper>();
builder.Services.AddTransient<IArticlesHelper, ArticlesHelper>();
builder.Services.AddTransient<IContactHelper, ContactHelper>();
builder.Services.AddTransient<IEmailSenderHelper, EmailSenderHelper>();

var app = builder.Build();


if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

using (var serviceScope = app.Services.GetService<IServiceScopeFactory>().CreateScope())
{
    var context = serviceScope.ServiceProvider.GetRequiredService<ShopContext>();
    context.Database.EnsureCreated();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
