# SK Fabricator & Erector - Backend

This solution contains the backend API for the SK Fabricator & Erector application.

It is built with .NET 8 using Clean Architecture principles.

## Structure

- `src/Api`: The presentation layer (ASP.NET Core Web API).
- `src/Application`: Contains business logic, services, and DTOs.
- `src/Domain`: Core domain models and interfaces.
- `src/Infrastructure`: Data access, external services, and other concrete implementations.
- `tests/`: Unit and integration tests.

## Getting Started

1.  Ensure you have the .NET 8 SDK installed.
2.  Restore dependencies: `dotnet restore`
3.  Build the solution: `dotnet build`
4.  Run the API: `dotnet run --project src/Api`
