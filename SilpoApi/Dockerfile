FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /source

COPY ["SilpoApi/SilpoApi.csproj", "SilpoApi/"]
RUN dotnet restore "SilpoApi/SilpoApi.csproj"

COPY . .
WORKDIR /source/SilpoApi
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "SilpoApi.dll"]
