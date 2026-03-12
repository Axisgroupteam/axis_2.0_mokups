import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftIcon, ChevronDownIcon, ChevronRightIcon, SaveIcon, PencilIcon, XIcon, ShieldCheckIcon } from "lucide-react";

// Represents hierarchical permissions DB schema
const ALL_PERMISSIONS = [
  {
    id: 1,
    keyName: "locationPermission",
    name: "Location Management",
    description: "Manage locations in the system",
    parentPermissionId: null,
  },
  { id: 11, keyName: "locationCreate", name: "Create Location", parentPermissionId: 1 },
  { id: 12, keyName: "locationView", name: "View Location", parentPermissionId: 1 },
  { id: 13, keyName: "locationUpdate", name: "Update Location", parentPermissionId: 1 },
  { id: 14, keyName: "locationArchive", name: "Archive Location", parentPermissionId: 1 },
  
  {
    id: 2,
    keyName: "userPermission",
    name: "User Management",
    description: "Manage users in the system",
    parentPermissionId: null,
  },
  { id: 21, keyName: "userCreate", name: "Create User", parentPermissionId: 2 },
  { id: 22, keyName: "userView", name: "View User", parentPermissionId: 2 },
  { id: 23, keyName: "userUpdate", name: "Update User", parentPermissionId: 2 },
  { id: 24, keyName: "userArchive", name: "Archive User", parentPermissionId: 2 },
  
  {
    id: 3,
    keyName: "orderPermission",
    name: "Order Management",
    description: "Manage orders and loads",
    parentPermissionId: null,
  },
  { id: 31, keyName: "orderCreate", name: "Create Order", parentPermissionId: 3 },
  { id: 32, keyName: "orderView", name: "View Order", parentPermissionId: 3 },
  { id: 33, keyName: "orderUpdate", name: "Update Order", parentPermissionId: 3 },
  { id: 34, keyName: "orderArchive", name: "Archive Order", parentPermissionId: 3 },

  {
    id: 4,
    keyName: "assetPermission",
    name: "Asset Management",
    description: "Manage trucks, trailers, and equipment",
    parentPermissionId: null,
  },
  { id: 41, keyName: "assetCreate", name: "Create Asset", parentPermissionId: 4 },
  { id: 42, keyName: "assetView", name: "View Asset", parentPermissionId: 4 },
  { id: 43, keyName: "assetUpdate", name: "Update Asset", parentPermissionId: 4 },
  { id: 44, keyName: "assetArchive", name: "Archive Asset", parentPermissionId: 4 },

  {
    id: 5,
    keyName: "customerPermission",
    name: "Customer Management",
    description: "Manage customers and contacts",
    parentPermissionId: null,
  },
  { id: 51, keyName: "customerCreate", name: "Create Customer", parentPermissionId: 5 },
  { id: 52, keyName: "customerView", name: "View Customer", parentPermissionId: 5 },
  { id: 53, keyName: "customerUpdate", name: "Update Customer", parentPermissionId: 5 },
  { id: 54, keyName: "customerArchive", name: "Archive Customer", parentPermissionId: 5 },

  {
    id: 6,
    keyName: "payeePermission",
    name: "Payee Management",
    description: "Manage payees and payment info",
    parentPermissionId: null,
  },
  { id: 61, keyName: "payeeCreate", name: "Create Payee", parentPermissionId: 6 },
  { id: 62, keyName: "payeeView", name: "View Payee", parentPermissionId: 6 },
  { id: 63, keyName: "payeeUpdate", name: "Update Payee", parentPermissionId: 6 },
  { id: 64, keyName: "payeeArchive", name: "Archive Payee", parentPermissionId: 6 },

  {
    id: 7,
    keyName: "surchargeApprovalPermission",
    name: "Surcharge Approval Tiers",
    description: "Manage surcharge approval thresholds and levels",
    parentPermissionId: null,
  },
  { id: 71, keyName: "surchargeTier1Auto", name: "Tier 1 - Auto Approval", parentPermissionId: 7 },
  { id: 72, keyName: "surchargeTier2Dispatcher", name: "Tier 2 - Dispatcher Approval", parentPermissionId: 7 },
  { id: 73, keyName: "surchargeTier3VP", name: "Tier 3 - VP Operations Approval", parentPermissionId: 7 },
];

// Mock roles that would otherwise come from API
const MOCK_ROLES = [
  {
    id: 1,
    code: "ADM01",
    keyName: "admin",
    name: "Administrator",
    description: "Full system access including creating and archiving resources",
    permissions: ALL_PERMISSIONS.map(p => p.id),
  },
  {
    id: 2,
    code: "DSP01",
    keyName: "dispatcher",
    name: "Dispatcher",
    description: "Can manage orders and view locations/users.",
    permissions: [1, 12, 2, 22, 3, 31, 32, 33],
  },
  {
    id: 3,
    code: "DRV01",
    keyName: "driver",
    name: "Driver",
    description: "Can only view assigned orders and locations",
    permissions: [1, 12, 3, 32], 
  },
  {
    id: 4,
    code: "OPR01",
    keyName: "operator",
    name: "Operator",
    description: "Operational staff for daily activities",
    permissions: [3, 31, 32],
  },
  {
    id: 5,
    code: "MNG01",
    keyName: "manager",
    name: "Manager",
    description: "Management level access with overview capabilities",
    permissions: [1, 12, 2, 22, 3, 31, 32, 33, 4, 42, 5, 52],
  },
  {
    id: 6,
    code: "TECH01",
    keyName: "technician",
    name: "Technician",
    description: "Technical and maintenance access",
    permissions: [4, 41, 42, 43],
  },
];

const getDescendantIds = (node) => {
   let ids = [node.id];
   if (node.children) {
      node.children.forEach(child => {
      ids = [...ids, ...getDescendantIds(child)];
      });
   }
   return ids;
};

const PermissionAssignment = () => {
   const { roleId } = useParams();
   const navigate = useNavigate();
   const [expandedNodes, setExpandedNodes] = useState({});
   const [isSaving, setIsSaving] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   
   const role = MOCK_ROLES.find(r => r.id === parseInt(roleId)) || { name: 'Unknown Role', permissions: [] };
   const [selectedPermissions, setSelectedPermissions] = useState(role.permissions);

   // Build a tree from flat permissions
 
   // Build a tree from flat permissions
   const permissionTree = useMemo(() => {
     const map = {};
     const roots = [];
 
     ALL_PERMISSIONS.forEach(node => {
       map[node.id] = { ...node, children: [] };
     });
 
     ALL_PERMISSIONS.forEach(node => {
       if (node.parentPermissionId) {
         if (map[node.parentPermissionId]) {
            map[node.parentPermissionId].children.push(map[node.id]);
         }
       } else {
         roots.push(map[node.id]);
       }
     });
 
     // Auto expand based on initial selection on component mount
     const expansions = {};
     const determineExpansions = (nodes) => {
       nodes.forEach(n => {
          const ids = getDescendantIds(n);
          if (ids.some(id => role.permissions.includes(id))) {
             expansions[n.id] = true;
          }
          if (n.children) determineExpansions(n.children);
       });
     };
     determineExpansions(roots);
     setExpandedNodes(expansions);

     return roots;
   }, [role.permissions]);

   const setNodeState = (node, isChecked, currentPerms) => {
      let newPerms = new Set(currentPerms);
      const affectedIds = getDescendantIds(node);
      
      if (isChecked) {
         affectedIds.forEach(id => newPerms.add(id));
         
         // Select ancestors if all their children are now selected
         let currentParentId = node.parentPermissionId;
         while (currentParentId) {
         const parentNode = ALL_PERMISSIONS.find(p => p.id === currentParentId);
         const childrenIds = ALL_PERMISSIONS.filter(p => p.parentPermissionId === currentParentId).map(p => p.id);
         if (childrenIds.every(id => newPerms.has(id))) {
            newPerms.add(currentParentId);
         }
         currentParentId = parentNode?.parentPermissionId;
         }
      } else {
         affectedIds.forEach(id => newPerms.delete(id));
         
         // Unselect ancestors 
         let currentParentId = node.parentPermissionId;
         while (currentParentId) {
         newPerms.delete(currentParentId);
         const parentNode = ALL_PERMISSIONS.find(p => p.id === currentParentId);
         currentParentId = parentNode?.parentPermissionId;
         }
      }
      return Array.from(newPerms);
   };
 
   const handlePermissionToggle = (node, isChecked) => {
      setSelectedPermissions(prev => setNodeState(node, isChecked, prev));
   };
 
   const getNodeState = (node) => {
      const isChecked = selectedPermissions.includes(node.id);
      if (!node.children || node.children.length === 0) {
         return isChecked ? true : false;
      }
  
      const descendantIds = getDescendantIds(node).filter(id => id !== node.id);
      const checkedDescendants = descendantIds.filter(id => selectedPermissions.includes(id));
      
      if (checkedDescendants.length === descendantIds.length) {
        return true; // All selected
      } else if (checkedDescendants.length > 0) {
        return "indeterminate"; // Partial
      }
      
      return false; // None selected
   };

   const toggleExpand = (nodeId) => {
      setExpandedNodes(prev => ({
        ...prev,
        [nodeId]: !prev[nodeId]
      }));
   };

   const isSelectAllGlobalChecked = () => {
      return ALL_PERMISSIONS.every(p => selectedPermissions.includes(p.id));
   };

   const handleSelectAllGlobal = (checked) => {
      if (checked) {
         setSelectedPermissions(ALL_PERMISSIONS.map(p => p.id));
      } else {
         setSelectedPermissions([]);
      }
   };

   const handleSave = () => {
      setIsSaving(true);
      // Mock API call to save assigned permissions
      console.log(`Saved permissions to role ${roleId}:`, selectedPermissions);
      setTimeout(() => {
         setIsSaving(false);
         navigate("/app/carrier-portal/master/roles");
      }, 500);
   };

   const renderPermissionNode = (node, depth = 0) => {
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = expandedNodes[node.id];
      const nodeState = getNodeState(node);
  
      return (
        <div key={node.id} className="w-full">
          <div 
             className={`flex items-center py-2 px-3 hover:bg-muted/30 transition-colors border-b last:border-0 ${depth === 0 ? 'bg-muted/10' : ''}`}
             style={{ paddingLeft: `${(depth * 1.5) + 0.75}rem` }}
          >
            <div className="flex items-center space-x-2 flex-1">
               {hasChildren ? (
                  <Button 
                     variant="ghost" 
                     size="icon" 
                     className="h-5 w-5 p-0 hover:bg-transparent text-muted-foreground"
                     onClick={(e) => { e.preventDefault(); toggleExpand(node.id); }}
                  >
                    {isExpanded ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
                  </Button>
               ) : (
                  <div className="w-5" /> // Spacer for alignment
               )}
               
               <Checkbox 
                  id={`perm_${node.id}`}
                  checked={nodeState}
                  onCheckedChange={(checked) => handlePermissionToggle(node, checked)}
                  disabled={!isEditing}
               />
               <Label 
                 htmlFor={`perm_${node.id}`} 
                 className={`text-sm cursor-pointer ${depth === 0 ? 'font-semibold' : 'font-medium'} ${nodeState ? 'text-foreground' : 'text-muted-foreground'}`}>
                 {node.name}
               </Label>
            </div>
            {node.description && (
               <span className="text-xs text-muted-foreground max-w-[200px] truncate hidden sm:inline-block pr-2">
                 {node.description}
               </span>
            )}
          </div>
          
          {hasChildren && isExpanded && (
            <div className="flex flex-col w-full border-l ml-[2.25rem] mt-1 mb-2">
              {node.children.map(child => renderPermissionNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
   };

   return (
      <div className="flex flex-col h-full bg-background overflow-hidden">
         <Tabs defaultValue="permissions" className="w-full h-full flex flex-col overflow-hidden">
            <div className="flex-shrink-0 border-b bg-background">
               <div className="flex items-center justify-between pr-4">
                  <TabsList className="mb-0 rounded-none h-11 bg-transparent border-0 p-0">
                     <TabsTrigger 
                        value="permissions" 
                        className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 font-semibold text-xs uppercase tracking-wider"
                     >
                        <ShieldCheckIcon className="size-3.5 mr-2" />
                        Permissions
                     </TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-3">
                     {!isEditing ? (
                        <Button 
                           size="sm"
                           variant="ghost"
                           onClick={() => setIsEditing(true)} 
                           className="h-8 text-[11px] font-bold uppercase tracking-wider bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 px-4"
                        >
                           <PencilIcon className="size-3 mr-2" />
                           Edit Permissions
                        </Button>
                     ) : (
                        <>
                           <Button 
                              size="sm"
                              variant="outline" 
                              className="h-8 text-[11px] font-bold uppercase tracking-wider px-4"
                              onClick={() => {
                                 setSelectedPermissions(role.permissions);
                                 setIsEditing(false);
                              }}
                           >
                              <XIcon className="size-3 mr-2" />
                              Cancel
                           </Button>
                           <Button 
                              size="sm"
                              onClick={handleSave} 
                              disabled={isSaving}
                              className="h-8 text-[11px] font-bold uppercase tracking-wider bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 px-4"
                           >
                              <SaveIcon className="size-3 mr-2" />
                              {isSaving ? "Saving..." : "Save Assignments"}
                           </Button>
                        </>
                     )}
                  </div>
               </div>
            </div>

            <div className="flex-1 overflow-auto -mt-1 bg-muted/30">
               <TabsContent value="permissions" className="space-y-4 px-2 py-2 h-full mt-0">
                  <div className="flex gap-4 h-fit max-w-6xl mx-auto">
                     {/* Role Info Card - Matching Location Profile Card style */}
                     <div className="w-1/3 border rounded-sm bg-card flex flex-col shadow-sm">
                        <div className="px-4 py-3 border-b bg-muted/50 flex items-center justify-between">
                           <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                              <ShieldCheckIcon className="size-4" />
                              Role Profile
                           </h3>
                        </div>
                        <div className="divide-y divide-border">
                           <div className="px-4 py-2.5">
                              <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-0.5">Role Name</p>
                              <p className="text-sm font-medium text-foreground">{role.name}</p>
                           </div>
                           <div className="px-4 py-2.5">
                              <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-0.5">Description</p>
                              <p className="text-sm text-foreground">{role.description || "-"}</p>
                           </div>
                        </div>
                     </div>

                     {/* Permission Hierarchy Card */}
                     <Card className="flex-1 border rounded-sm shadow-sm overflow-hidden flex flex-col">
                        <CardHeader className="bg-muted/50 border-b py-3 px-4">
                           <div className="flex items-center justify-between text-sm">
                              <div className="space-y-0.5">
                                 <CardTitle className="text-sm font-semibold">Permission Hierarchy</CardTitle>
                                 <p className="text-[11px] text-muted-foreground">
                                    {isEditing ? "Select nodes to grant access." : "Currently assigned permissions."}
                                 </p>
                              </div>
                              <div className="flex items-center space-x-2 bg-background px-2.5 py-1 rounded border shadow-sm">
                                 <Checkbox 
                                    id="select_all_perms" 
                                    checked={isSelectAllGlobalChecked()}
                                    onCheckedChange={(checked) => handleSelectAllGlobal(checked)} 
                                    disabled={!isEditing}
                                    className="h-3.5 w-3.5"
                                 />
                                 <Label
                                    htmlFor="select_all_perms"
                                    className="text-[11px] font-bold uppercase tracking-wider cursor-pointer"
                                 >
                                    Select All
                                 </Label>
                              </div>
                           </div>
                        </CardHeader>
                        <CardContent className="p-0 overflow-auto">
                           <div className="divide-y divide-border/50">
                              {permissionTree.map(rootNode => renderPermissionNode(rootNode))}
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </TabsContent>
            </div>
         </Tabs>
      </div>
   );
};

export default PermissionAssignment;
