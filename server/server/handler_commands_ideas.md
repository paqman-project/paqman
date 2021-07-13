# Recursive search for command paths by parameter

Wiki entry for Endpoint: https://git.leon.wtf/paqman/paqman/-/wikis/Backend/API-Routes/Command-path-by-parameter

## Only "have" provided with at least one entry

1. Request all parameters in `have` array from Database (`params`)
2. Call `param1.FindSubsequentParameters(param2, ..., paramN)`:
    - Continue to call `param.FindSubsequentParameters()` recursively for every parameter yielded by step 2.
    - If `len(params) == 0`, return empty `commandWithChildren` instance
    - Stop at a maximum recusion depth of 5 _(for the moment)_
    - Save passed commands in struct `commandsWithChildren`
3. Marshal and return the first node of the structure

## Only "want" provided

1. Request the wanted parameter from Database (`param`)
2. Call `param.FindPreviousParameters()` recursively:
    - Call method for every parameter yielded
    - Stop if `param.ReturnedFrom == nil || len(param.ReturnedFrom) == 0` or at a maximum recusion depth of 15 _(for the moment)_
    - Save passed commands in struct `commandsWithChildren`
3. Marshal and return the first node of the structure


## Both provided

1. Request all parameters in `have` array from Database (`haveParams`)
2. Request the wanted parameter from Database (`wantParam`)
3. Call `haveParam1.FindSubsequentParameters(haveParam2, ..., haveParamN)`:
    - Continue to call `param.FindSubsequentParameters()` recursively for every parameter yielded by step 3.
    - If `len(params) == 0`, return empty `commandWithChildren` instance
    - Stop if `wantParam` occurs (compare IDs!) or at a maximum recusion depth of 5 _(for the moment)_
    - Save passed commands in struct `commandsWithChildren`
4. Marshal and return the first node of the structure

## Code reference

```go
type commandsWithChildren struct {
    structs.SmallCommand                        `json:",inline"`
    Children             []*commandWithChildren `json:"_children"`
}
```