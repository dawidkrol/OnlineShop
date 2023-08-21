using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Library.Migrations
{
    public partial class Update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_ShopItems_Id",
                table: "Images");

            migrationBuilder.AddColumn<Guid>(
                name: "ShopItemId",
                table: "Images",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Images_ShopItemId",
                table: "Images",
                column: "ShopItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_ShopItems_ShopItemId",
                table: "Images",
                column: "ShopItemId",
                principalTable: "ShopItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_ShopItems_ShopItemId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_ShopItemId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "ShopItemId",
                table: "Images");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_ShopItems_Id",
                table: "Images",
                column: "Id",
                principalTable: "ShopItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
