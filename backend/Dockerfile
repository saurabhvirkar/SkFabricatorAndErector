# Use the official .NET SDK image as a build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy the solution file and restore dependencies
COPY *.sln .
COPY src/Api/Api.csproj src/Api/
COPY src/Application/Application.csproj src/Application/
COPY src/Domain/Domain.csproj src/Domain/
COPY src/Infrastructure/Infrastructure.csproj src/Infrastructure/
COPY Directory.Packages.props .
RUN dotnet restore "SkFabricator.sln"

# Copy the rest of the source code and build the application
COPY . .
WORKDIR /source/src/Api
RUN dotnet publish -c Release -o /app/publish --no-restore

# Use the official ASP.NET runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Api.dll"]
