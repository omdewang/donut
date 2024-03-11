const ruleBlockHolder = document.getElementById("rule-view-block");
const ruleAddRuleBtn = document.getElementById("rule-add-button");
let ruleCount = 0;
let ruleSelectCount = 0;

const ruleSet = [
    {
        "select" : [ "select", "if" ]
    },
    {
        "select" : ["select"],
        "if" : [ "select", "connType", "Speed" ]
    },
    {
        "select" : ["select"],
        "connType" : ["select", "5g", "4g"],
        "Speed" : ["select", "30", "40", "10" ],
    },
    {
        "select" : ["select", "then"],
    },
    {
        "select" : ["select", "exec"],
    },
    {
        "select" : [ "done" ],
    }
]

// gives us a select block options will be the ruleset provided
function getRuleBlock(_ruleset)
{
    const ruleDropDownMenu = document.createElement("select");

    for(var i = 0; i < _ruleset.length; i++)
    {
        var ruleOption = document.createElement("option");
        ruleOption.value = _ruleset[i];
        ruleOption.innerHTML = ruleOption.value;
        ruleDropDownMenu.appendChild(ruleOption);
    }

    return ruleDropDownMenu;
}

function createRuleBlock(blockToAttachTo, _ruleSet)
{
    if(ruleSelectCount >= ruleSet.length - 1)
    {
        const ruleCreated = new Event("ruleCreated", () => {})
        document.dispatchEvent(ruleCreated);

        return;
    }

    let ruleSelect = getRuleBlock(_ruleSet);
    blockToAttachTo.appendChild(ruleSelect);

    ruleSelect.addEventListener("change", (event) => {

        ruleSelectCount++;
        
        if(ruleSet[ruleSelectCount][event.target.value])
        {
            createRuleBlock(blockToAttachTo, ruleSet[ruleSelectCount][event.target.value]);
        }
        else
        {
            createRuleBlock(blockToAttachTo, ruleSet[ruleSelectCount]["select"]);
        }
    }) 
}

ruleAddRuleBtn.addEventListener("click", () => {

    ruleSelectCount = 0;
    // create new div add all the drop down to the div
    var ruleBlockDiv = document.createElement("div");
    var ruleBlockId = document.createElement("p");

    ruleBlockId.innerHTML = ruleCount;
    ruleBlockDiv.className = "rule-block";
    ruleBlockDiv.appendChild(ruleBlockId);

    createRuleBlock(ruleBlockDiv, ruleSet[0]["select"]);

    // then add the div to the main block

    ruleBlockHolder.appendChild(ruleBlockDiv);

    ruleCount++;
})

document.addEventListener("ruleCreated", () => {
    console.log("rule created");
})