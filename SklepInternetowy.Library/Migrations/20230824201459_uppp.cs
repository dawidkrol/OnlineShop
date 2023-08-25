using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Library.Migrations
{
    public partial class uppp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShopItems_Categories_CategoryDbModelId",
                table: "ShopItems");

            migrationBuilder.DropIndex(
                name: "IX_ShopItems_CategoryDbModelId",
                table: "ShopItems");

            migrationBuilder.DropColumn(
                name: "CategoryDbModelId",
                table: "ShopItems");

            migrationBuilder.CreateIndex(
                name: "IX_ShopItems_CategoryId",
                table: "ShopItems",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopItems_Categories_CategoryId",
                table: "ShopItems",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShopItems_Categories_CategoryId",
                table: "ShopItems");

            migrationBuilder.DropIndex(
                name: "IX_ShopItems_CategoryId",
                table: "ShopItems");

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryDbModelId",
                table: "ShopItems",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ShopItems_CategoryDbModelId",
                table: "ShopItems",
                column: "CategoryDbModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopItems_Categories_CategoryDbModelId",
                table: "ShopItems",
                column: "CategoryDbModelId",
                principalTable: "Categories",
                principalColumn: "Id");
        }
    }
}
