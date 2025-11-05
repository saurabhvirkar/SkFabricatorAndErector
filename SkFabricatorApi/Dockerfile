# Use the official .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the project file and restore dependencies
COPY SkFabricatorApi/SkFabricatorApi.csproj ./SkFabricatorApi/
RUN dotnet restore SkFabricatorApi/SkFabricatorApi.csproj

# Copy the rest of the application code
COPY . .

# Publish the application
RUN dotnet publish SkFabricatorApi/SkFabricatorApi.csproj -c Release -o out

# Use the official ASP.NET Core runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Expose the port the application runs on
EXPOSE 10000

# Start the application
ENTRYPOINT ["dotnet", "SkFabricatorApi.dll"]
