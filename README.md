# dcm-requirements

[![Build status](https://heymrcarter.visualstudio.com/Destiny%20Clan%20Manager/_apis/build/status/DCM-Requirements)](https://heymrcarter.visualstudio.com/Destiny%20Clan%20Manager/_build/latest?definitionId=19)
![Release status](https://vsrm.dev.azure.com/heymrcarter/_apis/public/Release/badge/7e5f3784-dda9-4bf0-9c99-7bde292990b9/5/14)

> Clan membership requirements microservice for Destiny Clan Manager

## Endpoints

### `createClanRequirement`

```{bash}
POST /requirement
```

Request body: <a href="#requirement">`Requirement`</a>

Create a <a href="#requirement">`Requirement`</a> for the clan

### `getClanRequirements`

```{bash}
GET /requirement?clanId={clanId}
```

Returns all <a href="#requirement">`Requirements`</a> for a given clan

## Resources

### `Requirement`

| Property | Type | Description |
| --- | --- | --- |
| `id` | `String` | A generated GUID to identify the requirement |
| `clanId` | `String` | The Bungie.net ID of the clan the requirement is for |
| `type` | `String` | The type of requirement; like platform, expansions, or K/D |
| `value` | `String` | The required threshold a member must meet for whatever `type` is |
