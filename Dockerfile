FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY timetopost.sln ./
COPY API/API.csproj API/
COPY Core/Core.csproj Core/
COPY Infrastructure/Infrastructure.csproj Infrastructure/

RUN dotnet restore timetopost.sln

COPY . ./

RUN dotnet publish API/API.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/out ./

EXPOSE 80

ENTRYPOINT ["dotnet", "API.dll"]
